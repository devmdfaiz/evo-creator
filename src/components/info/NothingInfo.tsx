import TypographyMuted from '../typography/TypographyMuted'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'

const NothingInfo = () => {
  return (
    <section className="w-full my-10 flex justify-center items-center">
    <div className="flex gap-2 items-center justify-center flex-col border-2 py-4 px-6 rounded-md">
      <TypographyMuted className="text-base">
        Currently, there are no items to display.
      </TypographyMuted>
      <Link
        href="/payment-page/create"
        className="text-primary flex items-center justify-center py-2 px-4 gap-1 hover:bg-primary/10 rounded-md"
      >
        <PlusCircle className="w-5 h-5" />
        Create Page
      </Link>
    </div>
  </section>
  )
}

export default NothingInfo
