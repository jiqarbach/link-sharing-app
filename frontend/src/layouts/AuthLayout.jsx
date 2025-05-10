export const AuthLayout = ({ children }) => {
  return (
    <section className="bg-neutral-100">
      <div className="flex sm:justify-center sm:items-center h-screen w-full">
        <div className="w-full sm:w-auto">{children}</div>
      </div>
    </section>
  );
};
