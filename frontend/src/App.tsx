import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { SummaryTable } from "./components/SummaryTable";

import { useApplication } from "./hooks/useApplication";
import { api } from "./lib/axios";

navigator.serviceWorker.register('service-worker.js')
  .then(async serviceWorker => {
    let subscription = await serviceWorker.pushManager.getSubscription();

    if (!subscription) {
      const publicKeyResponse = await api.get('/push/public_key')

      subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKeyResponse.data.publicKey,
      });
    };

    await api.post('/push/register', {
      subscription,
    });

    await api.post('/push/send', {
      subscription,
    });
  });

export function App() {
  const { activeMenu } = useApplication();

  return (
    <div>
      <div className={`${activeMenu ? 'w-72' : 'w-0'} fixed justify-start sidebar duration-75 ease-in bg-white dark:bg-zinc-800 z-10`}>
          <Sidebar />
      </div>
      <div className="flex justify-center lg:items-center mt-16 lg:mt-0 w-screen h-screen">
        <div className="flex flex-col gap-16 w-full max-w-5xl px-6">
          <Header />
          <SummaryTable />
        </div>
      </div>
    </div>
  )
}
