import { site } from "@/content";

export function FloatingContacts() {
  const whatsappUrl = `https://wa.me/${site.contact.whatsapp}`;
  const telegramUrl = site.contact.telegramHandle
    ? (site.contact.telegramHandle.startsWith("http")
        ? site.contact.telegramHandle
        : `https://t.me/${site.contact.telegramHandle}`)
    : "https://t.me/";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_28px_rgba(37,211,102,0.5)] active:scale-95"
      >
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-ink/90 px-3 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur-sm group-hover:block">
          WhatsApp
        </span>
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
          className="transition-transform group-hover:rotate-6"
        >
          <path d="M12.031 2C6.516 2 2.029 6.487 2.029 12.002c0 1.942.556 3.754 1.52 5.289L2.007 22l4.856-1.517c1.474.887 3.2 1.396 5.168 1.396 5.515 0 10.003-4.487 10.003-10.002C22.034 6.487 17.546 2 12.031 2zm0 18.257c-1.745 0-3.37-.506-4.757-1.382l-.341-.217-2.879.899.914-2.812-.236-.363a8.212 8.212 0 0 1-1.258-4.38c0-4.551 3.702-8.253 8.257-8.253 4.555 0 8.257 3.702 8.257 8.253 0 4.552-3.702 8.255-8.257 8.255zm4.721-6.173c-.259-.13-1.532-.756-1.769-.843-.238-.086-.411-.13-.584.13-.173.259-.67 1.341-.822 1.514-.151.173-.303.195-.562.065-.259-.13-1.096-.404-2.088-1.288-.772-.689-1.294-1.54-1.446-1.799-.151-.259-.016-.399.113-.528.117-.116.259-.303.389-.454.13-.151.173-.259.259-.432.086-.173.043-.325-.022-.454-.065-.13-.584-1.408-.8-1.928-.21-.508-.424-.439-.584-.447l-.498-.009c-.173 0-.454.065-.692.325-.238.259-.908.887-.908 2.163 0 1.277.93 2.511 1.06 2.684.13.173 1.83 2.795 4.433 3.92.619.268 1.103.428 1.48.548.622.198 1.189.17 1.636.103.499-.075 1.532-.627 1.748-1.233.216-.606.216-1.126.151-1.233-.065-.107-.238-.172-.497-.302z" />
        </svg>
      </a>

      {/* Telegram Button */}
      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="group relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-[0_8px_24px_rgba(34,158,217,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_28px_rgba(34,158,217,0.5)] active:scale-95"
      >
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-ink/90 px-3 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur-sm group-hover:block">
          Telegram
        </span>
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="currentColor"
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.673c.46 0 .663-.211.921-.46l2.211-2.15 4.6 3.398c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.415z" />
        </svg>
      </a>
    </div>
  );
}
