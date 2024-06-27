import { InfoCircledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <InfoBox />
  );
}

function InfoBox() {
  return (
    <div className="bg-blue-50 text-blue-700 border-l-4 border-blue-500 px-6 py-4 rounded-lg shadow-lg flex items-center flex-wrap gap-4 mx-3">
      <InfoCircledIcon className="w-6 h-6 text-blue-500" />
      <div className="flex-1">
        <p className="text-sm md:text-base font-semibold">
          This site is under development, but you can still create an account and explore this project.
        </p>
      </div>
      <Link className="bg-blue-500 text-white px-4 py-2 rounded-full transition-transform transform hover:scale-105 hover:bg-blue-600" href="/sign-up">
          Sign Up
      </Link>
    </div>
  );
}

export default LandingPage