# Memory Game Admin Dashboard

A beautiful, responsive Angular administrative dashboard for the Memory Game backend. This application allows administrators to view aggregated statistics about player registrations, gameplay analytics, and API usage.

## Features

- 🔐 **JWT Authentication** - Secure login with JWT tokens
- 📊 **Interactive Visualizations** - HighCharts-powered charts and graphs
- 👥 **Player Management** - View and search registered players
- 📈 **Analytics Dashboard** - Real-time aggregated game statistics
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ⚡ **High Performance** - Optimized component architecture with proper separation of concerns
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Main dashboard component
│   │   ├── login/              # Authentication page
│   │   ├── header/             # Header with navigation
│   │   ├── stats-card/         # Reusable statistics card
│   │   ├── api-chart/          # API usage pie chart
│   │   ├── games-chart/        # Games over time line chart
│   │   └── players-list/       # Searchable players list
│   ├── services/
│   │   ├── auth.service.ts     # Authentication & JWT management
│   │   └── admin.service.ts    # Admin API calls
│   ├── guards/
│   │   └── auth.guard.ts       # Route protection
│   ├── models/
│   │   └── admin.model.ts      # TypeScript interfaces
│   ├── app.routes.ts           # Route configuration
│   ├── app.config.ts           # Application configuration
│   └── app.ts                  # Root component
├── styles.scss                 # Global styles
└── main.ts                     # Entry point
```

## Architecture & Best Practices

### 🏗️ MVC Pattern
- **Models**: Strongly typed interfaces in `models/admin.model.ts`
- **Views**: Angular components with templates (.html files)
- **Controllers**: Services handling business logic and data

### 🔧 Service Layer
- **AuthService**: Manages JWT tokens and authentication state
- **AdminService**: Handles all admin API endpoint calls
- Services are provided at root level for singleton pattern

### 🛡️ Route Protection
- **AuthGuard**: Protects dashboard route from unauthenticated access
- Automatic redirect to login when token is invalid

### 📦 Component Decomposition
- **Stateless components**: `StatsCard`, `ApiChart`, `GamesChart`, `PlayersList`
- **Container components**: `Dashboard`, `Login`
- Clear input/output boundaries for data flow

### 🎨 Styling Architecture
- **SCSS modules**: Component-specific styles
- **Global styles**: Shared variables and resets
- **Responsive design**: Mobile-first approach with media queries
- **Consistent color scheme**: Purple/gradient theme

## Technology Stack

- **Framework**: Angular 18+
- **Language**: TypeScript
- **Styling**: SCSS
- **HTTP Client**: Built-in HttpClient
- **Charts**: HighCharts for Angular
- **Package Manager**: npm

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- Angular CLI (v18+)

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Start the development server**:
```bash
ng serve
```

The application will be available at `http://localhost:4200`

### Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Configuration

### Backend API URL

The application connects to the Symfony backend at `http://localhost:8000`. To change this:

1. Edit `src/app/services/auth.service.ts`
2. Update the `API_URL` constant
3. Edit `src/app/services/admin.service.ts`
4. Update the `API_URL` constant

### CORS Configuration

Ensure your Symfony backend has CORS enabled for `http://localhost:4200`:

```php
// config/packages/nelmio_cors.yaml
CORS_ALLOW_ORIGIN='^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$'
```

## Usage

### Login
1. Navigate to `http://localhost:4200/login`
2. Enter credentials (default admin: username=`Henk`, password=`password`)
3. Submit to receive JWT token

⚠️ **Important**: The backend must be running and initialized with test users first!
See `../TEST_CREDENTIALS.md` for complete backend setup instructions.

### Dashboard
After login, you'll see:
- **Overview Cards**: Total games, players, and API integrations
- **API Usage Chart**: Pie chart showing API popularity
- **Games Over Time**: Line chart showing gameplay trends
- **Players List**: Searchable and sortable player directory

## API Integration

The application communicates with the following backend endpoints (all require ROLE_ADMIN):

- `GET /admin/aggregate` - Overall statistics
- `GET /admin/players` - Player list with emails
- `GET /admin/dates` - Games per day statistics
- `GET /admin/games` - All played games

## Authentication Flow

1. User enters credentials in login form
2. AuthService sends POST request to `/memory/login`
3. Backend returns JWT token
4. Token stored in localStorage with key `admin_token`
5. Token included in all subsequent API requests via `Authorization: Bearer {token}` header
6. AuthGuard protects routes by checking token validity

## Styling & Responsive Design

### Color Palette
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Dark Purple)
- Success: `#00d4ff` (Cyan)
- Background: `#f5f7fa` (Light Gray)

### Breakpoints
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: 768px - 1024px
- **Wide**: > 1024px

### Typography
- Font Family: Segoe UI, Tahoma, Geneva, Verdana
- Headings: 600 weight
- Body: 400 weight
- Sizes: 12px - 32px depending on context

## Build & Deployment

### Build for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

### Deployment

The application can be deployed to:
- Docker container
- Azure App Service
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting service

## Performance Optimizations

- ✅ Lazy loading of modules
- ✅ OnPush change detection strategy (planned)
- ✅ Unsubscribe from observables in ngOnDestroy
- ✅ Efficient component decomposition
- ✅ Minified production build
- ✅ Tree-shaking of unused code

## Accessibility

- ✅ Semantic HTML elements
- ✅ ARIA labels where needed
- ✅ Keyboard navigation support
- ✅ Focus indicators for accessibility
- ✅ Color contrast ratios meet WCAG AA standards

## Security Considerations

- ✅ JWT tokens validated on backend
- ✅ XSS prevention through Angular's sanitization
- ✅ CSRF protection via HttpClient
- ✅ Secure token storage (localStorage with httpOnly planned)
- ✅ Route guards prevent unauthorized access

## TypeScript Configuration

The project uses strict TypeScript settings:
- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- All components are fully typed

## Testing

To run unit tests:
```bash
ng test
```

To run end-to-end tests:
```bash
ng e2e
```

## Code Quality

- ESLint configured for code style
- Prettier configured for code formatting
- Angular Style Guide followed throughout
- Comprehensive code comments
- Type-safe implementations

## Troubleshooting

### "Cannot connect to backend" Error
- Verify Symfony backend is running on `http://localhost:8000`
- Check CORS configuration in backend
- Verify network connectivity

### "Unauthorized" Error
- Check if your token has expired (tokens typically expire after 1 hour)
- Clear localStorage and re-login
- Verify user has `ROLE_ADMIN` in backend

### Charts Not Displaying
- Verify HighCharts library is installed: `npm list highcharts`
- Check browser console for JavaScript errors
- Ensure data is being received from backend

## Further Help

- [Angular Documentation](https://angular.dev)
- [HighCharts Documentation](https://www.highcharts.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## License

This project is part of the Hanze University WebTech curriculum.

## Contributing

To contribute:
1. Create a feature branch
2. Make your changes
3. Ensure TypeScript compilation is successful
4. Submit a pull request

## Support

For issues or questions about the admin dashboard, please contact the development team.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
