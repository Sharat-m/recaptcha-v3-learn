import { LoginForm } from "./_components/login-form";

export default function Home() {
  return (
    <main className="container mx-auto flex items-center h-screen justify-center">
      <div className="flex justify-center items-center border-2 rounded-md p-10">
        <LoginForm />
      </div>
    </main>
  );
}
