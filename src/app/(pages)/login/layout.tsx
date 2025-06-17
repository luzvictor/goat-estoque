// Este layout se aplica apenas à rota /login e não terá a sidebar.
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // O container principal centraliza o conteúdo na tela
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {children}
    </div>
  );
}
