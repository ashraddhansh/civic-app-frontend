"use client"

interface IssueCardProps {
  id: string
  date: string
  status: string
  image?: string
  category?: string
  onClick?: () => void
}

export function IssueCard({ id, date, status, image, category, onClick }: IssueCardProps) {
  return (
    <div 
      className="flex items-stretch bg-white rounded-xl px-0 py-0 shadow-md border border-gray-100 cursor-pointer hover:shadow-lg hover:bg-gray-50 transition-all duration-200"
      onClick={onClick}
    >
      <div className="flex-shrink-0">
        {image ? (
          <img
            src={image}
            alt="Issue"
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            className="rounded-tl-xl rounded-bl-xl rounded-r-none object-cover bg-gray-200 border border-gray-300 h-full w-[110px]"
            style={{ width: 110, height: 110 }}
          />
        ) : (
          <div
            className="rounded-tl-xl rounded-bl-xl rounded-r-none border border-gray-300 h-full w-[110px] flex items-center justify-center"
            style={{ width: 110, height: 110, background: 'linear-gradient(135deg,#e0e7ff,#fce7f3)' }}
          >
            <span className="text-xs font-semibold text-gray-700 text-center px-2">
              {category ? category.replace(/_/g,' ').slice(0,18) : 'No Image'}
            </span>
          </div>
        )}
      </div>
      <div className="text-base flex flex-col gap-1 justify-center ml-8">
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-gray-800">Issue ID:</span>
          <span className="text-gray-500 font-medium">{id}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-gray-800">Date:</span>
          <span className="text-gray-500 font-medium">{date}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold text-blue-700">Status:</span>
          <span className="text-gray-500 font-medium">{status}</span>
        </div>
      </div>
    </div>
  )
}
