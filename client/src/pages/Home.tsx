import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Streamdown } from 'streamdown';


export default function Home() {
  
  let { user, loading, error, isAuthenticated, logout } = useAuth();

 

  return (
    <div className="min-h-screen flex flex-col">
      <main>
        
        <Loader2 className="animate-spin" />
        Example Page
        
        <Streamdown>Any **markdown** content</Streamdown>
        <Button variant="default">Example Button</Button>
      </main>
    </div>
  );
}
