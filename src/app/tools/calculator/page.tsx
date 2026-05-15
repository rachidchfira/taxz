import { redirect } from 'next/navigation'

// Redirect to the canonical calculator
export default function ToolsCalculatorPage() {
  redirect('/calculator')
}
