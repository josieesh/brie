// POST to /user/repos
export interface createRepoRequestBody {
    // see https://developer.github.com/v3/repos/#parameters-4
    name: string;
    description: string;
    homepage: string;
    private: boolean;
    visibility: string; // overrides the private parameter when both are used with the nebula-preview preview header
    has_issues: boolean; // toggle issues for repo
    has_projects: boolean; // toggle projects for repo
    has_wiki: boolean;
    is_template: boolean; // Default false. Toggle making repo available as template repo
    team_id: number;
    auto_init: boolean; // Default false. If true, create initial commit with empty README.
    gitignore_template: string; // Desired language or platform .gitignore template to apply. Use the name of the template without the extension. For example, "Haskell".
    license_template: string; // Open source license template. For example, "mit" or "mpl-2.0".
    allow_squash_merge: boolean; // Default true. Allow squash-merging pull requests.
    allow_merge_commit: boolean; // Default true. Allow merging pull requests.
    allow_rebase_merge: boolean; // Default true. Allow rebase-merging pull.
}