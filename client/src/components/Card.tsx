import { useState } from "react";

import { Link } from "react-router-dom";

function functionConvetMiliSecondsToTime(millisec: number) {
  const seconds = (millisec / 1000).toFixed(0);
  const minutes = (millisec / (1000 * 60)).toFixed(0);
  const hours = (millisec / (1000 * 60 * 60)).toFixed(0);
  const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(0);

  if (parseInt(seconds) < 60) {
    return seconds + " Sec";
  } else if (parseInt(minutes) < 60) {
    return minutes + " Min";
  } else if (parseInt(hours) < 24) {
    return hours + " Hrs";
  } else {
    return days + " Days";
  }
}

function formatDateTime(dateTimeString: string | number | Date) {
  const dateTime = new Date(dateTimeString);
  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return `${formattedDate} ${formattedTime}`;
}

const NFT_CARD = ({
  tokenId,
  owner,
  price,
  image,
  type,
  data,
}: {
  tokenId: number;
  owner: string;
  price: string;
  image: string;
  type: any;
  data: any;
}) => {
  const [dataLogs, setData] = useState(data);
  const [key, setKey] = useState(Date.now());
  const [metaData, setMetaData] = useState<any>([]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const LimitString = (str: string, limit: number) => {
    if (str.length > limit) {
      return str.slice(0, limit) + "...";
    } else {
      return str;
    }
  };

  function getCurrentTimestampInSeconds() {
    return Math.floor(Date.now() / 1000);
  }

  return (
    <>
      <Link to={`/nft/${tokenId}`}>
        <div className="h-[358px] w-[220px] border rounded-xl border-gray-400 overflow-hidden">
          <div key={key} className="flex flex-col h-full p-1.5">
            <img
              className="w-[200px] h-[200px] object-cover rounded-xl"
              src={image}
              alt={`${tokenId}`}
            />
            <div className="mt-4">
              <div className="mx-3 flex justify-between">
                <p className="font-semibold text-md">
                  {dataLogs.name
                    ? LimitString(dataLogs.name, 12)
                    : "Chargement.."}
                </p>
                <p className="border border-gray-400 text-xs ml-2 my-auto py-1 px-2 rounded-lg">
                  #{tokenId}
                </p>
              </div>
              <p className="mx-3 mb-4 text-sm text-slate-500">
                Owner: {formatAddress(owner)}
              </p>
              <div className="inline-grid grid-cols-2 gap-3 bg-slate-200 mx-auto px-3 py-2.5 rounded-xl w-full">
                <div className="col-span-1 w-full">
                  {type == "sale" ? (
                    <>
                      <p className="font-semibold text-sm text-slate-500">
                        Price
                      </p>
                      <p className="font-semibold text-sm pt-1">{price} ETH</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-sm text-slate-500">
                        Time left
                      </p>
                      <p className="font-semibold text-sm pt-1">
                        {functionConvetMiliSecondsToTime(data.listEndTime)}
                      </p>
                    </>
                  )}
                </div>

                <div className="col-span-1 w-full">
                  {type == "sale" ? (
                    <>
                      <p className="font-semibold text-sm text-slate-500">
                        Highest Bid
                      </p>
                      <p className="font-semibold text-xs pt-1">No bids yet</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-xs text-slate-500">
                        Minimum Bid
                      </p>
                      <p className="font-semibold text-sm pt-2">
                        {data.highestBid} wEth
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default NFT_CARD;
