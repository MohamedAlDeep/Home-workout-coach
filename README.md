# Daily Home Coach

A comprehensive fitness tracking web application built with SvelteKit that helps users manage their home workouts, track progress, and maintain a healthy lifestyle.

## Features

### 🏋️‍♂️ Workout Management
- Extensive workout library with exercises categorized by muscle groups
- Exercise variations and difficulty levels
- Equipment suggestions for home workouts
- Log workouts with sets, reps, duration, and calories burned

### 📊 Progress Tracking
- Dashboard with recent workout history
- Calories burned tracking by date
- Personal fitness statistics
- BMI calculation and health metrics

### 👤 User Profile
- User registration and profile management
- Secure cookie-based session management
- Personal information storage (name, email, fitness data)
- Persistent user data across sessions

### 📱 Responsive Design
- Mobile-friendly interface
- Clean and intuitive user experience
- Modern SvelteKit architecture

## Tech Stack

- **Frontend**: SvelteKit, JavaScript, HTML5, CSS3
- **Database**: Dexie.js (IndexedDB wrapper)
- **State Management**: Svelte Stores
- **Routing**: SvelteKit file-based routing
- **Data Persistence**: Browser cookies + IndexedDB

## Project Structure

```
app/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Add.svelte              # Main signup component
│   │   │   ├── SignUpElement.svelte    # User registration form
│   │   │   └── WorkoutForm.svelte      # Workout logging form
│   │   ├── stores/
│   │   │   └── user.js                 # User state management
│   │   ├── utils/
│   │   │   └── cookies.js              # Cookie utilities
│   │   ├── db.js                       # Dexie database configuration
│   │   └── workouts.json               # Workout data
│   ├── routes/
│   │   ├── dashboard/
│   │   │   └── +page.svelte           # User dashboard
│   │   ├── profile/
│   │   │   └── +page.svelte           # User profile page
│   │   ├── workouts/
│   │   │   └── +page.svelte           # Workout library
│   │   ├── +layout.svelte             # Global layout
│   │   └── +page.svelte               # Home page
│   └── app.html
├── static/
├── package.json
└── README.md
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Daily_Home_Coach/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## Usage

### Getting Started
1. **Sign Up**: Create your profile with personal information and fitness goals
2. **Browse Workouts**: Explore the workout library organized by muscle groups
3. **Log Workouts**: Record your exercises with sets, reps, and duration
4. **Track Progress**: View your dashboard to see recent workouts and calories burned

### User Registration
- Fill out the signup form with your details
- System calculates BMI automatically
- Profile data is saved securely in cookies and local storage

### Workout Tracking
- Browse exercises by category (Strength, Cardio, Core, etc.)
- Each exercise includes equipment requirements and difficulty level
- Log completed workouts with detailed metrics

### Dashboard Features
- Recent workout history (last 5 workouts)
- Daily calories burned tracking
- Total calorie statistics
- Quick access to all major features

## Database Schema

### Workouts Table
```javascript
{
  id: number,           // Auto-increment primary key
  workout: string,      // Exercise name
  sets: number,         // Number of sets
  reps: number,         // Repetitions per set
  duration: number,     // Duration in minutes
  calories: number,     // Calories burned
  date: string          // Workout date
}
```

### User Data (Cookies)
```javascript
{
  name: string,
  lastname: string,
  email: string,
  username: string,
  weight: number,
  height: number,
  bmi: number
}
```

## Development

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Code Structure
- **Components**: Reusable UI components in `/src/lib/components/`
- **Stores**: Global state management in `/src/lib/stores/`
- **Utils**: Helper functions in `/src/lib/utils/`
- **Routes**: Page components following SvelteKit routing conventions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- [ ] Workout scheduling and reminders
- [ ] Progress charts and analytics
- [ ] Social features and workout sharing
- [ ] Integration with fitness devices
- [ ] Nutrition tracking
- [ ] Custom workout creation
- [ ] Video exercise demonstrations
- [ ] Achievement system and badges

## Support

For questions, issues, or contributions, please open an issue on the repository or contact the development team.

---

**Daily Home Coach** - Your personal fitness companion for home workouts! 💪