import { Card, CardContent } from "@/components/ui/card";
// import Build from "/Build.gif";
// import Complete from "/Complete.gif";
// import Empty from "/Empty.gif";

export default function RowCards() {
  return (
    <div className="flex items-center justify-center space-x-4 w-full container">
      <Card className="w-1/3 bg-dark border-gray-300">
        <CardContent className="flex items-center justify-between p-4 text-white">
          <p className="text-xl font-medium pl-4">
            1. Scan our empty NFT physical card
          </p>
         
        </CardContent>
      </Card>

      <div className="flex items-center justify-center">
        <ArrowRightIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
      </div>
      <Card className="w-1/3 bg-dark border-gray-300">
        <CardContent className="flex items-center justify-between p-4 text-white">
          <p className="text-xl font-medium pl-4">2. Customize it</p>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center">
        <ArrowRightIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
      </div>
      <Card className="w-1/3 bg-dark border-gray-300">
        <CardContent className="flex items-center justify-between p-4 text-white">
          <p className="text-xl font-medium pl-4">
            3. Buy one community NFT piece
          </p>
          
        </CardContent>
      </Card>
    </div>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
