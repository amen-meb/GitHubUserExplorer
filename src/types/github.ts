export interface GitHubUser {
  login: string;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
}

export interface GitHubRepository {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
}

export interface GitHubRepositoryDetail extends GitHubRepository {
  full_name: string;
  html_url: string;
  watchers_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRateLimit {
    rate: {
        limit: number;
        remaining: number;
        reset: number;
    };
}