# DriveHOS - FMCSA HOS Compliant Trip Planner

A comprehensive trip planning application for commercial truck drivers that ensures compliance with Federal Motor Carrier Safety Administration (FMCSA) Hours of Service (HOS) regulations.

## Project Overview

DriveHOS (also branded as TruckRoute Pro) is designed to help truck drivers plan their routes while staying compliant with federal driving hour regulations. The application calculates optimal routes considering current HOS status, mandatory rest periods, and driving limits.

## Key Features

### 🚛 Smart Trip Planning
- **Multi-point routing**: Current location → Pickup → Drop-off
- **Address geocoding**: Convert addresses to coordinates using OpenStreetMap
- **Interactive mapping**: Visual route display and location management

### ⏰ HOS Compliance Management
- **70-hour cycle tracking**: Monitor hours used in 8-day cycle
- **Automatic limit warnings**: Alerts when approaching 60+ hours
- **34-hour reset notifications**: Required when reaching 70-hour limit
- **Real-time compliance checking**: Ensures all trips meet FMCSA regulations

### 📊 Regulatory Features
- **11-hour daily driving limit** enforcement
- **14-hour duty window** calculations
- **30-minute break requirements** after 8 hours driving
- **10-hour off-duty rest** period validation
- **ELD compatibility** for electronic logging

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API communication

### Backend
- **Django** REST API (Python)
- **OpenStreetMap Nominatim** for geocoding

### Development Tools
- **Vite** for build tooling
- **ESLint** for code quality
- **Git** for version control

## Project Structure

```
HOS-planner/
├── FrontendHOS/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TripPlanningForm.tsx
│   │   │   ├── Map.tsx
│   │   │   └── TripResults.tsx
│   │   ├── utils/
│   │   │   ├── api.ts
│   │   │   └── tripservice.ts
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 16+
- Python 3.8+
- Django 4.0+

### Frontend Setup
```bash
cd FrontendHOS
npm install
npm run dev
```

### Backend Setup
```bash
# Start Django server on http://localhost:8000
python manage.py runserver
```

## Usage

1. **Enter Locations**: Input current location, pickup, and drop-off addresses
2. **Set HOS Status**: Enter current hours used in 70-hour cycle
3. **Plan Trip**: Click "Plan Compliant Trip" to generate route
4. **Review Results**: View compliance status and route details

## Compliance Features

- ✅ **FMCSA Certified** calculations
- ✅ **ELD Compatible** data format
- ✅ **Real-time validation** of driving limits
- ✅ **Automatic break scheduling**
- ✅ **Rest period enforcement**

## API Integration

The application communicates with a Django backend at `http://localhost:8000/api` for:
- Trip planning calculations
- HOS compliance validation
- Route optimization

## Contributing

This project follows FMCSA regulations and requires careful testing of all compliance features before deployment.

## License

Commercial trucking compliance software - ensure proper licensing for commercial use.