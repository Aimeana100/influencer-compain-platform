## Imfluencer Campaign platform 

file structure:
```
src/
│
├── auth/               # JWT Authentication Module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   └── auth.module.ts
│
├── user/               # User Module (Influencers and Brands)
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.schema.ts
│   └── user.module.ts
│
├── campaign/           # Campaign Management Module
│   ├── campaign.controller.ts
│   ├── campaign.service.ts
│   ├── campaign.schema.ts
│   └── campaign.module.ts
│
├── submission/         # Submission and Performance Module
│   ├── submission.controller.ts
│   ├── submission.service.ts
│   ├── submission.schema.ts
│   └── submission.module.ts
│
├── app.controller.ts   # Root Controller
├── app.module.ts       # Root Module
├── app.service.ts      # Root Service
├── main.ts             # Entry Point
│
├── common/             # Shared Utilities
│   ├── decorators/     # Custom Decorators
│   ├── dto/            # Shared DTOs
│   ├── filters/        # Exception Filters
│   ├── guards/         # Auth Guards
│   └── interfaces/     # Shared Interfaces
│
└── config/             # Configuration Files
    ├── database.config.ts
    └── jwt.config.ts
```