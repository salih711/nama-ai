import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import { AppLayout } from '@/components/layout/AppLayout';
import Dashboard from '@/pages/Dashboard';
import AiAgent from '@/pages/AiAgent';
import Recommendation from '@/pages/Recommendation';
import Cards from '@/pages/Cards';
import Financing from '@/pages/Financing';
import Investments from '@/pages/Investments';
import FinancialHealth from '@/pages/FinancialHealth';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';
import Services from '@/pages/Services';
import Transfer from '@/pages/Transfer';
import Payments from '@/pages/Payments';
import Beneficiaries from '@/pages/Beneficiaries';
import InternationalTransfer from '@/pages/InternationalTransfer';

const queryClient = new QueryClient();

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/ai-agent" component={AiAgent} />
        <Route path="/recommendation/:id" component={Recommendation} />
        <Route path="/cards" component={Cards} />
        <Route path="/financing" component={Financing} />
        <Route path="/investments" component={Investments} />
        <Route path="/financial-health" component={FinancialHealth} />
        <Route path="/reports" component={Reports} />
        <Route path="/services" component={Services} />
        <Route path="/transfer" component={Transfer} />
        <Route path="/payments" component={Payments} />
        <Route path="/beneficiaries" component={Beneficiaries} />
        <Route path="/international-transfer" component={InternationalTransfer} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
