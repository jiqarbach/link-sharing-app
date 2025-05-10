import { Navbar } from "../components/common";
import ProtectedRoute from "../lib/ProtectedRoute";

export const BaseLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <section className="bg-neutral-100 min-h-screen">
        <Navbar />

        <div className="p-[24px] pt-0">{children}</div>
      </section>
    </ProtectedRoute>
  );
};
