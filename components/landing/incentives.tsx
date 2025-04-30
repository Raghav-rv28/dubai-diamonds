import { CreditCardIcon, HelpCircleIcon, PlaneIcon, ShoppingCart } from 'lucide-react';

export default function Incentives() {
  return (
    <div className="my-10 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <PlaneIcon className="h-8 w-8 text-gray-900 dark:text-white" />
            <h3 className="md:text-md mt-2 text-sm font-semibold text-gray-900 dark:text-white lg:text-lg">
              Discounted Shipping
            </h3>
            <p className="md:text-md mt-1 text-sm text-gray-600 dark:text-white lg:text-lg">
              Use coupons to get discounts over orders of $2000
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <HelpCircleIcon className="h-8 w-8 text-gray-900 dark:text-white" />
            <h3 className="md:text-md mt-2 text-sm font-semibold text-gray-900 dark:text-white lg:text-lg">
              Support 24/7
            </h3>
            <p className="md:text-md mt-1 text-sm text-gray-600 dark:text-white lg:text-lg">
              Support 24 hours a day
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <CreditCardIcon className="h-8 w-8 text-gray-900 dark:text-white" />
            <h3 className="md:text-md mt-2 text-sm font-semibold text-gray-900 dark:text-white lg:text-lg">
              100% Payment Secure
            </h3>
            <p className="md:text-md mt-1 text-sm text-gray-600 dark:text-white lg:text-lg">
              We ensure secure payment
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <ShoppingCart className="h-8 w-8 text-gray-900 dark:text-white" />
            <h3 className="md:text-md mt-2 text-sm font-semibold text-gray-900 dark:text-white lg:text-lg">
              Fast Shopping Cart
            </h3>
            <p className="md:text-md mt-1 text-sm text-gray-600 dark:text-white lg:text-lg">
              Securely checkout using saved user details
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
