import { accessInfo } from '@data/access'
import { ArrowUpRight, PinIcon } from '../components/Icons'
import PageHeader from '../components/PageHeader'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const mapQuery = encodeURIComponent(accessInfo.mapEmbedQuery)

export default function AccessPage() {
  useDocumentTitle('アクセス')

  return (
    <>
      <PageHeader eyebrow="Access" title="アクセス" lead={`${accessInfo.organization} ${accessInfo.floor}`} />

      <div className="container-site space-y-14 py-14 sm:py-20">
        <section className="grid gap-8 lg:grid-cols-2">
          <img
            src={accessInfo.buildingImage}
            alt="名古屋大学 情報基盤センター 外観"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-lg border border-line object-cover"
          />
          <div className="flex flex-col">
            <p className="eyebrow text-nu-600">Address</p>
            <h2 className="mt-2 text-2xl font-bold">{accessInfo.labName}</h2>
            <p className="mt-4 flex gap-2 leading-relaxed">
              <PinIcon className="mt-1.5 h-4 w-4 shrink-0 text-nu-600" />
              <span>
                {accessInfo.address}
                <br />
                {accessInfo.floor}
              </span>
            </p>
            <p className="mt-4 rounded-md border border-line bg-white px-4 py-3 text-sm">
              最寄り駅：{accessInfo.stationLine}
              <strong className="ml-1">{accessInfo.station}</strong>
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-ink px-4 py-2.5 font-medium text-white hover:bg-ink-700"
              >
                Google Maps で開く
                <ArrowUpRight />
              </a>
              <a
                href={accessInfo.buildingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white px-4 py-2.5 hover:border-ink/40"
              >
                情報基盤センター
                <ArrowUpRight />
              </a>
            </div>
          </div>
        </section>

        <section>
          <p className="eyebrow text-nu-600">Routes</p>
          <h2 className="mt-2 text-2xl font-bold">交通アクセス</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {accessInfo.routes.map((r) => (
              <div key={r.from} className="card p-6">
                <h3 className="font-bold">{r.from} から</h3>
                <ol className="mt-4 space-y-2 border-l-2 border-nu-200 pl-4 text-sm leading-relaxed text-ink/85">
                  {r.description.split('→').map((step) => (
                    <li key={step} className="relative before:absolute before:-left-[1.3rem] before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-nu-500">
                      {step.trim()}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-line">
          <iframe
            title="名古屋大学 情報基盤センターの地図"
            src={`https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[420px] w-full"
          />
        </section>
      </div>
    </>
  )
}
