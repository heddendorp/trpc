import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { injectQuery, injectMutation } from '@tanstack/angular-query-experimental';
import { TRPCService } from '@trpc/tanstack-angular-query';

// Example router type - in real app this would come from your server
interface AppRouter {
  posts: {
    list: {
      query: () => Promise<{ id: number; title: string; content: string }[]>;
    };
    byId: {
      query: (input: { id: number }) => Promise<{ id: number; title: string; content: string }>;
    };
    create: {
      mutation: (input: { title: string; content: string }) => Promise<{ id: number; title: string; content: string }>;
    };
  };
}

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="posts-container">
      <h1>Posts</h1>
      
      <!-- Loading state -->
      @if (postsQuery.isLoading()) {
        <div class="loading">Loading posts...</div>
      }
      
      <!-- Error state -->
      @if (postsQuery.error()) {
        <div class="error">
          <h3>Error loading posts</h3>
          <p>{{ postsQuery.error()?.message }}</p>
          <button (click)="postsQuery.refetch()">Retry</button>
        </div>
      }
      
      <!-- Posts list -->
      @if (postsQuery.data()) {
        <div class="posts-list">
          @for (post of postsQuery.data(); track post.id) {
            <div class="post-card">
              <h3>{{ post.title }}</h3>
              <p>{{ post.content }}</p>
              <small>ID: {{ post.id }}</small>
            </div>
          } @empty {
            <p>No posts found</p>
          }
        </div>
      }
      
      <!-- Create post form -->
      <div class="create-post">
        <h2>Create New Post</h2>
        <form (ngSubmit)="createPost()" #postForm="ngForm">
          <div class="form-group">
            <label for="title">Title:</label>
            <input 
              type="text" 
              id="title" 
              [(ngModel)]="newPost.title" 
              name="title"
              required
              [disabled]="createPostMutation.isPending()"
            >
          </div>
          
          <div class="form-group">
            <label for="content">Content:</label>
            <textarea 
              id="content" 
              [(ngModel)]="newPost.content" 
              name="content"
              required
              [disabled]="createPostMutation.isPending()"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            [disabled]="createPostMutation.isPending() || !postForm.valid"
          >
            @if (createPostMutation.isPending()) {
              Creating...
            } @else {
              Create Post
            }
          </button>
        </form>
        
        @if (createPostMutation.error()) {
          <div class="error">
            <p>Error creating post: {{ createPostMutation.error()?.message }}</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .posts-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .loading, .error {
      text-align: center;
      padding: 20px;
      margin: 20px 0;
    }
    
    .error {
      background: #ffeaa7;
      border: 1px solid #fdcb6e;
      border-radius: 4px;
    }
    
    .posts-list {
      display: grid;
      gap: 20px;
      margin: 20px 0;
    }
    
    .post-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      background: white;
    }
    
    .post-card h3 {
      margin: 0 0 8px 0;
      color: #333;
    }
    
    .post-card p {
      margin: 8px 0;
      color: #666;
    }
    
    .post-card small {
      color: #999;
    }
    
    .create-post {
      margin-top: 40px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #f9f9f9;
    }
    
    .form-group {
      margin: 15px 0;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    
    .form-group textarea {
      min-height: 100px;
      resize: vertical;
    }
    
    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    button:hover:not(:disabled) {
      background: #0056b3;
    }
  `]
})
export class PostsComponent {
  private trpc = inject(TRPCService<AppRouter>);
  
  // Reactive form data
  newPost = signal({
    title: '',
    content: ''
  });
  
  // tRPC queries and mutations
  postsQuery = injectQuery(
    this.trpc.proxy.posts.list.queryOptions()
  );
  
  createPostMutation = injectMutation(
    this.trpc.proxy.posts.create.mutationOptions({
      onSuccess: () => {
        // Invalidate and refetch posts after successful creation
        this.trpc.queryClient.invalidateQueries({
          queryKey: this.trpc.proxy.posts.list.queryKey()
        });
        // Reset form
        this.newPost.set({ title: '', content: '' });
      }
    })
  );
  
  createPost() {
    const post = this.newPost();
    if (post.title.trim() && post.content.trim()) {
      this.createPostMutation.mutate(post);
    }
  }
}