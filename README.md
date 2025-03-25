# Eventify

## A modern event management platform built with React, TypeScript, and Tailwind CSS

## ✨ Features

- 📅 Comprehensive event management
- 🎨 Modern and responsive UI with dark mode support
- 🔐 Secure authentication system
- 📊 Analytics dashboard
- 📱 Mobile-first design
- 🌐 Internationalization support

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Type System:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Form Handling:** formik
- **Build Tool:** Vite
- **Code Quality:** ESLint + Prettier

## 🚀 Getting Started

1. **Clone the repository**
```bash
git https://github.com/EventifyDev/Eventify_Front.git
cd eventify
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example 
```

4. **Start development server**
```bash
npm run dev
```

## 🏗️ Architecture

```
src/
├── components/          # Reusable UI components
│   ├── Icons/          # SVG icons components
│   ├── Layouts/        # Layout components         
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── store/             # State management
├── routes/            # Route configurations
├── providers/         # React providers
├── config/            # App configuration
├── services/          # API services
├── utils/             # Utility functions
├── types/             # TypeScript types
├── styles/            # Global styles
└── public/            # Static assets
```

## 🎨 UI Components

### IconSystem
Our icon system supports three modes:
- Outline (default)
- Filled
- Duotone

```typescript
<IconCalendar className="w-6 h-6" fill={false} duotone={true} />
```

### EventifyLogo
The main logo component with gradient effects and animations:
```typescript
<EventifyLogo className="w-10 h-10" />
```

## 🌙 Dark Mode

Eventify supports system-wide dark mode with custom color schemes:

```typescript
<div className="dark:bg-slate-900 dark:text-white">
  {/* Your content */}
</div>
```

## 🎯 Core Features

### Event Management
- Create, edit, and delete events
- Manage attendees
- Track event capacity
- Real-time updates

### Dashboard Analytics
- Event performance metrics
- Attendance tracking
- User engagement statistics
- Custom reporting

## 🔧 Configuration

### Environment Variables
```env
REACT_APP_API_URL=your_api_url
```

## 📱 Responsive Design

Eventify uses Tailwind's responsive breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com)
- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Lucide Icons](https://lucide.dev)

## 🔄 Project Management

### Jira Integration
Track our project progress on [Jira](https://elmorjanimohamed.atlassian.net/jira/software/projects/EF/boards/10)

#### Workflow
- **Backlog**: Upcoming features and tasks
- **In Progress**: Currently being worked on
- **Review**: Ready for code review
- **Done**: Completed tasks

#### Issue Types
- 🛠️ Task
- 📝 Story

<div align="center">
  <sub>Built with ❤️ by Mohamed Elmorjani</sub>
</div>