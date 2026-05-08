import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-creme flex items-center justify-center">
      <SignUp />
    </div>
  );
}