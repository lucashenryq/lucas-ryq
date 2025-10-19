import { useTheme } from "@/react-app/hooks/useTheme";
import Dashboard from "@/react-app/pages/Dashboard";

export default function App() {
  useTheme(); // Initialize theme

  return <Dashboard />;
}
