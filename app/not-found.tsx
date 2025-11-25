import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="text-center">
        <h1 className="display-1 fw-bold text-primary" style={{ fontSize: '6rem' }}>404</h1>
        <h2 className="mb-3 fw-bold">Halaman Tidak Ditemukan</h2>
        <p className="text-muted mb-4 lead">
          Maaf, halaman yang Anda cari tidak ada, telah dipindahkan, <br />
          atau sedang dalam perbaikan.
        </p>
        
        <div className="d-flex justify-content-center gap-3">
          <Link href="/" className="btn btn-outline-secondary rounded-pill px-4 py-2">
            Kembali
          </Link>
          <Link href="/explore" className="btn btn-primary rounded-pill px-4 py-2">
            Explore Deck
          </Link>
        </div>
      </div>
    </div>
  );
}