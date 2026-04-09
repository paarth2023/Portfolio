export const projects = [
  {
    id: "bookify",
    title: "Bookify – Appointment Management System",
    meta: "Django · DRF · React · PostgreSQL · RabbitMQ · Redis · Celery",
    description: "High-performance orchestration platform for complex scheduling with AI-assisted multi-turn scheduling.",
    points: [
      "AI-assisted multi-turn scheduling with Gemini",
      "Persona-based RBAC for admins, organisers, and customers",
      "Asynchronous notifications via email and Twilio SMS",
      "Hybrid UUIDv4 + BigInt identifier strategy"
    ],
    github: "https://github.com/MahadevBalla/appointment_management_system",
    drawing: [
      "       ___________________",
      "      |  CALENDAR   [ x ] |",
      "      |___________________|",
      "      | SUN MON TUE WED...|",
      "      | 1   2   3   4     |",
      "      | 8   9  [10] 11    |",
      "      |___________________|",
      "     [ Bookify Orchestrator ]"
    ]
  },
  {
    id: "stockmaster",
    title: "StockMaster – Smart Inventory",
    meta: "Node.js · Express · React · MongoDB · JWT · Gemini AI",
    description: "Real-time, multi-warehouse inventory management system replacing spreadsheet-based workflows.",
    points: [
      "Role-based access with JWT + OTP security flows",
      "Activity feed, low-stock and expiry alerts",
      "Full stock movement history and AI summaries"
    ],
    github: "https://github.com/MahadevBalla/StockMaster",
    drawing: [
      "          __________",
      "         /         /|",
      "        /_________/ |",
      "        |         | |",
      "        |  STOCK  | |",
      "        |  UNITS  | /",
      "        |_________|/",
      "      [ Inventory Vault ]"
    ]
  },
  {
    id: "apex",
    title: "Apex Detector",
    meta: "PyTorch · OpenCV · Vision Transformers",
    description: "Video analysis pipeline that identifies deepfake generation techniques using transformer-based feature extraction.",
    points: [
      "Labeled dataset organised by generation method",
      "Vision Transformer model for feature extraction",
      "Hyperparameter tuning for classification consistency"
    ],
    github: "https://github.com/paarth2023",
    drawing: [
      "           .-------.",
      "          /   AI    \\",
      "         |   SCAN    |",
      "         |  [====]   |",
      "          \\   DET   /",
      "           '-------'",
      "     [ Deepfake Detection ]"
    ]
  },
  {
    id: "dotfiles",
    title: "Arch Linux Dotfiles",
    meta: "Hyprland · Waybar · Kitty · Zsh · Lua",
    description: "My personal configuration files for a high-performance, aesthetically pleasing Arch Linux setup.",
    points: [
      "Custom Hyprland workflow with seamless window management",
      "Themed styling across terminal, bar, and system UI",
      "Automated installation scripts for fresh Arch installs"
    ],
    github: "https://github.com/paarth2023/dotfiles",
    images: [
      "/projects/dotfiles/rice1.webp",
      "/projects/dotfiles/rice2.webp",
      "/projects/dotfiles/rice3.webp",
      "/projects/dotfiles/rice4.webp"
    ],
    drawing: [
      "      .--------.",
      "     /  ARCH    \\",
      "    |   [||]     |",
      "    |  DOTS      |",
      "     \\ RICE     /",
      "      '--------'",
      "    [ My Arch Rice ]"
    ]
  },
  {
    id: "neovim",
    title: "Neovim IDE Configuration",
    meta: "Lua · Lazy.nvim · LSP · Treesitter · Telescope",
    description: "A modern, highly-optimized Neovim setup focused on backend development productivity.",
    points: [
      "Blazing fast startup with Lazy.nvim loader",
      "LSP integration for Go, Python, C++, and Rust",
      "Custom UI components with Noice and Lualine",
      "Customised 'Green on Black' aesthetic (Matrix-inspired)"
    ],
    github: "https://github.com/paarth2023/neovim-config",
    images: ["/projects/neovim/config.png"],
    drawing: [
      "      __________",
      "     |  NEOVIM  |",
      "     |  [EDIT]  |",
      "     |  LUA     |",
      "     |__________|",
      "    [ Built with Lua ]"
    ]
  }
];
