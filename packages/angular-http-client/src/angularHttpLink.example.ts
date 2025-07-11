import { Component, Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { createTRPCClient, angularHttpLink } from '@trpc/client';

// Mock tRPC router type for demonstration
type AppRouter = {
  hello: {
    query: (input: { name: string }) => Promise<string>;
  };
  createUser: {
    mutate: (input: { name: string; email: string }) => Promise<{ id: number; name: string; email: string }>;
  };
};

@Injectable({
  providedIn: 'root'
})
export class TrpcService {
  private httpClient = inject(HttpClient);
  
  private client = createTRPCClient<AppRouter>({
    links: [
      angularHttpLink({
        url: 'http://localhost:3000/trpc',
        httpClient: this.httpClient,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    ],
  });

  // Expose specific tRPC procedures
  hello(name: string): Promise<string> {
    return this.client.hello.query({ name });
  }

  createUser(name: string, email: string): Promise<{ id: number; name: string; email: string }> {
    return this.client.createUser.mutate({ name, email });
  }
}

@Component({
  selector: 'app-trpc-example',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="container">
      <h2>tRPC Angular HttpClient Example</h2>
      
      <div class="section">
        <h3>Query Example</h3>
        <input
          type="text"
          [(ngModel)]="name"
          placeholder="Enter your name"
          (keyup.enter)="sayHello()"
        />
        <button (click)="sayHello()" [disabled]="loading">
          {{ loading ? 'Loading...' : 'Say Hello' }}
        </button>
        <div *ngIf="greeting" class="result">
          {{ greeting }}
        </div>
      </div>

      <div class="section">
        <h3>Mutation Example</h3>
        <input
          type="text"
          [(ngModel)]="userName"
          placeholder="User name"
        />
        <input
          type="email"
          [(ngModel)]="userEmail"
          placeholder="User email"
        />
        <button (click)="createUser()" [disabled]="loading">
          {{ loading ? 'Creating...' : 'Create User' }}
        </button>
        <div *ngIf="createdUser" class="result">
          User created: {{ createdUser.name }} ({{ createdUser.email }})
        </div>
      </div>

      <div *ngIf="error" class="error">
        Error: {{ error }}
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .section {
      margin-bottom: 30px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    
    input {
      margin: 5px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
    
    button {
      margin: 5px;
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 3px;
      cursor: pointer;
    }
    
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    
    .result {
      margin-top: 10px;
      padding: 10px;
      background-color: #d4edda;
      border: 1px solid #c3e6cb;
      border-radius: 3px;
      color: #155724;
    }
    
    .error {
      margin-top: 10px;
      padding: 10px;
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
      border-radius: 3px;
      color: #721c24;
    }
  `],
})
export class TrpcExampleComponent {
  private trpcService = inject(TrpcService);
  
  name = '';
  userName = '';
  userEmail = '';
  
  greeting: string | null = null;
  createdUser: { id: number; name: string; email: string } | null = null;
  loading = false;
  error: string | null = null;

  async sayHello(): Promise<void> {
    if (!this.name.trim()) {
      this.error = 'Please enter a name';
      return;
    }

    this.loading = true;
    this.error = null;
    this.greeting = null;

    try {
      this.greeting = await this.trpcService.hello(this.name);
    } catch (error: any) {
      this.error = error.message || 'Failed to get greeting';
    } finally {
      this.loading = false;
    }
  }

  async createUser(): Promise<void> {
    if (!this.userName.trim() || !this.userEmail.trim()) {
      this.error = 'Please enter both name and email';
      return;
    }

    this.loading = true;
    this.error = null;
    this.createdUser = null;

    try {
      this.createdUser = await this.trpcService.createUser(this.userName, this.userEmail);
    } catch (error: any) {
      this.error = error.message || 'Failed to create user';
    } finally {
      this.loading = false;
    }
  }
}

// Example of using the link with interceptors
@Injectable()
export class AuthInterceptor {
  intercept(req: any, next: any) {
    // Add authorization header to all tRPC requests
    if (req.url.includes('/trpc')) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.getAuthToken()}`
        }
      });
      return next.handle(authReq);
    }
    
    return next.handle(req);
  }
  
  private getAuthToken(): string {
    // Get token from your auth service
    return localStorage.getItem('auth-token') || '';
  }
}

// Example of a more advanced service with error handling
@Injectable({
  providedIn: 'root'
})
export class AdvancedTrpcService {
  private httpClient = inject(HttpClient);
  
  private client = createTRPCClient<AppRouter>({
    links: [
      angularHttpLink({
        url: 'http://localhost:3000/trpc',
        httpClient: this.httpClient,
        headers: ({ op }) => ({
          'Authorization': `Bearer ${this.getAuthToken()}`,
          'X-Operation-Type': op.type,
          'X-Operation-Path': op.path,
        }),
      }),
    ],
  });

  private getAuthToken(): string {
    // Get token from your auth service
    return localStorage.getItem('auth-token') || '';
  }

  // Wrapper methods with error handling
  async hello(name: string): Promise<string> {
    try {
      return await this.client.hello.query({ name });
    } catch (error: any) {
      console.error('Hello query failed:', error);
      
      // Handle specific HTTP errors
      if (error.data?.httpStatus === 401) {
        // Handle unauthorized
        throw new Error('Please log in to continue');
      } else if (error.data?.httpStatus === 500) {
        // Handle server errors
        throw new Error('Server error occurred');
      }
      
      throw error;
    }
  }

  async createUser(name: string, email: string): Promise<{ id: number; name: string; email: string }> {
    try {
      return await this.client.createUser.mutate({ name, email });
    } catch (error: any) {
      console.error('Create user mutation failed:', error);
      
      // Handle validation errors
      if (error.data?.code === 'BAD_REQUEST') {
        throw new Error('Invalid user data provided');
      }
      
      throw error;
    }
  }
}

// Export the component for use
export default TrpcExampleComponent;