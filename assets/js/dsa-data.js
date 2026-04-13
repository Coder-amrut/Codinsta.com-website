const dsaData = {
    'Arrays & Hashing': {
        icon: 'fas fa-th',
        color: '#6366f1',
        desc: 'The foundation of competitive programming. Arrays are contiguous memory blocks, while Hashing provides O(1) average time complexity for lookups and insertions.',
        overview: 'Mastering Arrays and Hashing is the first step in your DSA journey. You will learn about static and dynamic arrays, how to handle frequency counting, and why hash maps are indispensable for optimizing search operations from O(N) to O(1).',
        complexity: {
            time: 'Access: O(1), Search: O(N)/O(1), Insertion: O(N)/O(1)',
            space: 'O(N) for storage'
        },
        concepts: [
            'Fixed vs Dynamic Arrays',
            'Hash Functions & Collisions',
            'Prefix Sums',
            'Frequency Counting',
            'Two-Pointer foundations'
        ],
        realWorld: 'Used in database indexing, caching systems (LRU Cache), and autocomplete features.',
        code1: {
            title: 'Two Sum (Easy)',
            code: `// Two Sum Solution (C++)
vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for(int i=0; i<nums.size(); i++) {
        // If the complement (target - current) exists in map
        if(mp.count(target - nums[i])) 
            return {mp[target-nums[i]], i};
        
        // Store current value and its index
        mp[nums[i]] = i;
    }
    return {};
}`
        },
        code2: {
            title: 'Valid Anagram (Easy)',
            code: `// Valid Anagram Solution (C++)
bool isAnagram(string s, string t) {
    if(s.size() != t.size()) return false;
    
    int count[26] = {0};
    for(int i=0; i<s.size(); i++) {
        count[s[i]-'a']++;
        count[t[i]-'a']--;
    }
    
    for(int i=0; i<26; i++) {
        if(count[i] != 0) return false;
    }
    return true;
}`
        }
    },
    'Two Pointers': {
        icon: 'fas fa-arrows-left-right',
        color: '#10b981',
        desc: 'A powerful optimization technique primarily used on sorted arrays or strings to reduce time complexity from O(N^2) to O(N).',
        overview: 'Two Pointers involves using two variables (usually l and r) that iterate through a data structure at different speeds or from different directions. This is most effective when searching for pairs or subsegments in sorted arrays.',
        complexity: {
            time: 'O(N) - Single pass',
            space: 'O(1) - Constant space'
        },
        concepts: [
            'Left and Right pointers',
            'Fast and Slow pointers',
            'Sorted Array properties',
            'Palindrome checking',
            'In-place array manipulation'
        ],
        realWorld: 'Used in image processing, string reversal, and finding pairs in massive financial datasets.',
        code1: {
            title: 'Two Sum II (Medium)',
            code: `// Two Sum II - Sorted Array (C++)
vector<int> twoSum(vector<int>& numbers, int target) {
    int l = 0, r = numbers.size()-1;
    while(l < r) {
        int sum = numbers[l] + numbers[r];
        if(sum == target) return {l+1, r+1};
        
        if(sum < target) l++; 
        else r--;
    }
    return {};
}`
        },
        code2: {
            title: 'Container With Most Water (Medium)',
            code: `// Container With Most Water (C++)
int maxArea(vector<int>& height) {
    int l = 0, r = height.size()-1, res = 0;
    while(l < r) {
        int h = min(height[l], height[r]);
        res = max(res, h * (r - l));
        
        if(height[l] < height[r]) l++; 
        else r--;
    }
    return res;
}`
        }
    },
    'Sliding Window': {
        icon: 'fas fa-vector-square',
        color: '#f59e0b',
        desc: 'Efficiently find a subrange in an array or string that satisfies certain conditions. Essential for string manipulation problems.',
        overview: 'Sliding Window converts a nested O(N*K) loop into a linear O(N) operation. It maintains a "window" that grows when conditions are unmet and shrinks when they are, keeping track of the state within the window.',
        complexity: {
            time: 'O(N) - Linear scan',
            space: 'O(K) - Size of window state'
        },
        concepts: [
            'Fixed vs Variable size windows',
            'Window expansion and contraction',
            'State preservation (Sums, Sets)',
            'Maximum/Minimum subarray sums',
            'Longest substring tracking'
        ],
        realWorld: 'Used in TCP congestion control, streaming data analysis, and DNA sequence matching.',
        code1: {
            title: 'Buy/Sell Stock (Easy)',
            code: `// Best Time to Buy and Sell Stock (C++)
int maxProfit(vector<int>& prices) {
    int l = 0, r = 1, maxP = 0;
    while(r < prices.size()) {
        if(prices[l] < prices[r]) {
            maxP = max(maxP, prices[r]-prices[l]);
        } else {
            l = r;
        }
        r++;
    }
    return maxP;
}`
        },
        code2: {
            title: 'Longest Substring (Medium)',
            code: `// Longest Substring Without Repeating (C++)
int lengthOfLongestSubstring(string s) {
    unordered_set<char> st;
    int l = 0, res = 0;
    for(int r=0; r<s.size(); r++) {
        while(st.count(s[r])) { 
            st.erase(s[l]); 
            l++; 
        }
        st.insert(s[r]);
        res = max(res, r-l+1);
    }
    return res;
}`
        }
    },
    'Stacks': {
        icon: 'fas fa-layer-group',
        color: '#3b82f6',
        desc: 'Last-In-First-Out (LIFO) structure. Critical for problems involving nested structures, backtracking, and expression evaluation.',
        overview: 'Stacks are perfect for maintaining historical state where the most recent addition is the most important. Common applications include reversing data, undo operations, and parsing syntax.',
        complexity: {
            time: 'Push/Pop: O(1)',
            space: 'O(N)'
        },
        concepts: [
            'LIFO Principle',
            'Monotonic Stacks',
            'Recursive to Iterative conversion',
            'Parentheses matching',
            'Reverse Polish Notation'
        ],
        realWorld: 'Used in compiler syntax parsing, undo/redo features in editors, and browser back/forward buttons.',
        code1: {
            title: 'Valid Parentheses (Easy)',
            code: `// Valid Parentheses (C++)
bool isValid(string s) {
    stack<char> st;
    for(char c : s) {
        if(c == '(') st.push(')');
        else if(c == '{') st.push('}');
        else if(c == '[') st.push(']');
        else if(st.empty() || st.top() != c) return false;
        else st.pop();
    }
    return st.empty();
}`
        },
        code2: {
            title: 'Min Stack (Medium)',
            code: `// Min Stack Implementation (C++)
class MinStack {
    stack<int> s, m;
public:
    void push(int val) { 
        s.push(val); 
        if(m.empty() || val <= m.top()) m.push(val); 
    }
    void pop() { 
        if(s.top() == m.top()) m.pop(); 
        s.pop(); 
    }
    int top() { return s.top(); }
    int getMin() { return m.top(); }
};`
        }
    },
    'Binary Search': {
        icon: 'fas fa-search-plus',
        color: '#06b6d4',
        desc: 'Divide and conquer strategy for searching in sorted spaces. O(log N) efficiency is the goal.',
        overview: 'Binary Search is the ultimate optimization for search tasks on sorted data. By halving the search space in each step, it achieves logarithmic efficiency, making it superior for massive datasets.',
        complexity: {
            time: 'O(log N)',
            space: 'O(1)'
        },
        concepts: [
            'Search space reduction',
            'Sorting dependency',
            'Midpoint calculation',
            'Binary search on answer',
            'Rotated array variations'
        ],
        realWorld: 'Used in version control (git bisect), database query optimization, and resource allocation algorithms.',
        code1: {
            title: 'Binary Search (Easy)',
            code: `// Standard Binary Search (C++)
int search(vector<int>& nums, int target) {
    int low = 0, high = nums.size()-1;
    while(low <= high) {
        int mid = low + (high-low)/2;
        if(nums[mid] == target) return mid;
        if(nums[mid] < target) low = mid+1; 
        else high = mid-1;
    }
    return -1;
}`
        },
        code2: {
            title: 'Min in Rotated Array (Medium)',
            code: `// Min in Rotated Array (C++)
int findMin(vector<int>& nums) {
    int l = 0, r = nums.size()-1;
    while(l < r) {
        int mid = l + (r-l)/2;
        if(nums[mid] > nums[r]) l = mid + 1; 
        else r = mid;
    }
    return nums[l];
}`
        }
    },
    'Linked Lists': {
        icon: 'fas fa-link',
        color: '#ec4899',
        desc: 'Non-contiguous data storage. Master pointer manipulation, cyclic detection, and structural reversals.',
        overview: 'Unlike arrays, Linked Lists are dynamic and efficient at insertion and deletion. However, they lack direct access to elements. Mastering the manipulation of "next" pointers is critical here.',
        complexity: {
            time: 'Insert/Delete: O(1), Search: O(N)',
            space: 'O(1) extra space (usually)'
        },
        concepts: [
            'Singly vs Doubly Linked Lists',
            'Dummy Nodes',
            'Reversing pointers',
            'Cycle detection (Floyd\'s)',
            'Recursive list processing'
        ],
        realWorld: 'Used in music playlists, blockchain foundations, and memory management in operating systems.',
        code1: {
            title: 'Reverse List (Easy)',
            code: `// Reverse Linked List (C++)
ListNode* reverseList(ListNode* head) {
    ListNode *prev = NULL, *curr = head;
    while(curr) {
        ListNode* next = curr->next;
        curr->next = prev; 
        prev = curr; 
        curr = next;
    }
    return prev;
}`
        },
        code2: {
            title: 'Cycle Detection (Easy)',
            code: `// Linked List Cycle (C++)
bool hasCycle(ListNode *head) {
    ListNode *slow = head, *fast = head;
    while(fast && fast->next) {
        slow = slow->next; 
        fast = fast->next->next;
        if(slow == fast) return true;
    }
    return false;
}`
        }
    },
    'Trees': {
        icon: 'fas fa-tree',
        color: '#14b8a6',
        desc: 'Non-linear hierarchical structures. Master DFS (Depth First Search) and BFS (Breadth First Search) traversals.',
        overview: 'Trees represent hierarchical data like file systems or organization charts. Solving tree problems usually involves recursive Depth First Search (DFS) or level-by-level Breadth First Search (BFS).',
        complexity: {
            time: 'O(N) for traversals',
            space: 'O(H) - height of the tree'
        },
        concepts: [
            'Binary Search Trees (BST)',
            'DFS (Pre, In, Post order)',
            'BFS (Level-order traversal)',
            'Tree balancing',
            'Recursion depth'
        ],
        realWorld: 'Used in HTML DOM structures, folder systems, and search engine indexing (B-Trees).',
        code1: {
            title: 'Invert Tree (Easy)',
            code: `// Invert Binary Tree (C++)
TreeNode* invertTree(TreeNode* root) {
    if(!root) return NULL;
    swap(root->left, root->right);
    invertTree(root->left); 
    invertTree(root->right);
    return root;
}`
        },
        code2: {
            title: 'Max Depth (Easy)',
            code: `// Maximum Depth of Tree (C++)
int maxDepth(TreeNode* root) {
    if(!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}`
        }
    },
    'Backtracking': {
        icon: 'fas fa-undo-alt',
        color: '#f43f5e',
        desc: 'Systematically exploring all possible configurations to find a solution. DFS on a state space tree.',
        overview: 'Backtracking is about finding all possible solutions (or a specific one) by exploring every potential path. When a path is invalid, we "backtrack" to the previous state and try a different branch.',
        complexity: {
            time: 'Exponential - O(K^N)',
            space: 'O(N) recursion stack'
        },
        concepts: [
            'Base Case determination',
            'Subsets vs Permutations',
            'Path exploration and cleanup',
            'Decision Trees',
            'Pruning (Optimization)'
        ],
        realWorld: 'Used in chess AI engines, puzzle solvers (Sudoku), and circuit routing.',
        code1: {
            title: 'Subsets (Medium)',
            code: `// Subsets / Power Set (C++)
void solve(vector<int>& nums, int i, vector<int>& sub, vector<vector<int>>& res) {
    if(i == nums.size()) { res.push_back(sub); return; }
    
    // Choose the element
    sub.push_back(nums[i]);
    solve(nums, i+1, sub, res);
    
    // Don't choose the element (Backtrack)
    sub.pop_back();
    solve(nums, i+1, sub, res);
}`
        },
        code2: {
            title: 'Permutations (Medium)',
            code: `// Permutations (C++)
void permute(vector<int>& nums, int start, vector<vector<int>>& res) {
    if(start == nums.size()) { res.push_back(nums); return; }
    for(int i=start; i<nums.size(); i++) {
        swap(nums[start], nums[i]);
        permute(nums, start+1, res);
        swap(nums[start], nums[i]);
    }
}`
        }
    },
    'Graphs': {
        icon: 'fas fa-project-diagram',
        color: '#ef4444',
        desc: 'Modeling relationships between objects. Essential for shortest path and connectivity problems.',
        overview: 'Graphs are the most versatile structure for real-world modeling (social networks, roads). Key algorithms include BFS for shortest paths and DFS for connectivity or cycle detection.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        concepts: [
            'Adjacency List vs Matrix',
            'BFS (Shortest Path)',
            'DFS (Connectivity)',
            'Cycle Detection',
            'Dijkstra\'s Algorithm'
        ],
        realWorld: 'Used in Google Maps, social media friend recommendations, and peer-to-peer networks.',
        code1: {
            title: 'Island Count (Medium)',
            code: `// Number of Islands - DFS (C++)
void dfs(vector<vector<char>>& grid, int i, int j) {
    if(i<0 || i>=grid.size() || j<0 || j>=grid[0].size() || grid[i][j]=='0') return;
    grid[i][j] = '0'; // Sink the island
    dfs(grid, i+1, j); 
    dfs(grid, i-1, j); 
    dfs(grid, i, j+1); 
    dfs(grid, i, j-1);
}`
        },
        code2: {
            title: 'BFS Template (Medium)',
            code: `// BFS - Node Traversal (C++)
void bfs(int start, unordered_map<int, vector<int>>& adj) {
    queue<int> q; q.push(start);
    unordered_set<int> visited; visited.insert(start);
    while(!q.empty()) {
        int node = q.front(); q.pop();
        for(int neighbor : adj[node]) {
            if(!visited.count(neighbor)) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
}`
        }
    },
    'Dynamic Programming': {
        icon: 'fas fa-brain',
        color: '#4f46e5',
        desc: 'Breaking down complex problems into overlapping subproblems. Optimal substructure is key.',
        overview: 'DP is a strategy for solving complex problems by combining solutions of simpler subproblems. It trades space for time by storing results (memoization) to avoid redundant calculations.',
        complexity: {
            time: 'O(Subproblems)',
            space: 'O(N) for DP table'
        },
        concepts: [
            'Memoization (Top-down)',
            'Tabulation (Bottom-up)',
            'Overlapping subproblems',
            'Optimal substructure',
            'Knapsack Problem'
        ],
        realWorld: 'Used in stock market predictions, bio-informatics (DNA alignment), and resource optimization.',
        code1: {
            title: 'LCS (Medium)',
            code: `// Longest Common Subsequence (C++)
int lcs(string s1, string s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for(int i=1; i<=m; i++) {
        for(int j=1; j<=n; j++) {
            if(s1[i-1] == s2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}`
        },
        code2: {
            title: 'Coin Change (Medium)',
            code: `// Coin Change - Tabulation (C++)
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount+1, amount+1); 
    dp[0] = 0;
    for(int a=1; a<=amount; a++) {
        for(int c : coins) 
            if(a-c >= 0) dp[a] = min(dp[a], 1 + dp[a-c]);
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`
        }
    }
};
