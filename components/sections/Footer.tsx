export function Footer() {
    return (
        <footer
        id="contacto"
        className="px-4 pb-8"
      >
  
        <div className="mx-auto max-w-[1280px]">
  
          <div className="overflow-hidden rounded-[34px] bg-gradient-to-r from-[#062F3C] via-[#0A4F55] to-[#22B96D]">
  
          <div className="grid gap-8 p-7 lg:gap-10 lg:p-14 lg:grid-cols-[420px_1fr_330px]">

{/* IZQUIERDA */}

<div>

<h2 className="text-center lg:text-left text-[42px] lg:text-[54px] font-black tracking-tight leading-none">

    <span className="text-white">
      Ainova
    </span>

    <span className="text-[#25D366]">
      Health
    </span>

  </h2>

  <p className="mt-6 text-center lg:text-left text-[19px] leading-8 text-white/80">
  Llevamos atención médica profesional, rápida y segura
  directamente hasta tu hogar, cuando más lo necesitas.
</p>

  {/* BOTÓN */}

  <button
    className="
      mt-10
      flex
      items-center
      gap-4
      rounded-full
      bg-[#25D366]
      px-6 lg:px-8
py-4 lg:py-5
      shadow-[0_20px_50px_rgba(37,211,102,.45)]
      transition
      hover:scale-[1.03]
    "
  >

    <div className="text-[34px]">
      💬
    </div>

    <div>

      <p className="text-left text-[18px] lg:text-[22px] font-bold text-white">
        Solicitar Médico Ahora
      </p>

      <p className="text-left text-white/80">
        Respuesta inmediata
      </p>

    </div>

  </button>

</div>

<div className="grid gap-6">

  {/* Item */}

  <div className="flex items-start gap-4">

    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">

      <span className="text-3xl">🕒</span>

    </div>

    <div>

      <h3 className="text-xl font-bold text-white">
        Disponibles 24/7
      </h3>

      <p className="mt-2 text-white/75 leading-7">
        Atención médica todos los días del año,
        cuando más la necesites.
      </p>

    </div>

  </div>

  {/* Item */}

  <div className="flex items-start gap-4">

    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">

      <span className="text-3xl">🏠</span>

    </div>

    <div>

      <h3 className="text-xl font-bold text-white">
        Llegamos a tu hogar
      </h3>

      <p className="mt-2 text-white/75 leading-7">
        Sin filas, sin desplazamientos
        y con atención inmediata.
      </p>

    </div>

  </div>

  {/* Item */}

  <div className="flex items-start gap-4">

    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">

      <span className="text-3xl">🩺</span>

    </div>

    <div>

      <h3 className="text-xl font-bold text-white">
        Médicos certificados
      </h3>

      <p className="mt-2 text-white/75 leading-7">
        Profesionales altamente
        calificados y verificados.
      </p>

    </div>

  </div>

  {/* Item */}

  <div className="flex items-start gap-4">

    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">

      <span className="text-3xl">💚</span>

    </div>

    <div>

      <h3 className="text-xl font-bold text-white">
        Atención humana
      </h3>

      <p className="mt-2 text-white/75 leading-7">
        Cuidamos de ti y de tu familia
        con calidez y profesionalismo.
      </p>

    </div>

  </div>

</div>

{/* DERECHA */}

<div className="relative flex items-center justify-center">

  {/* Círculo de fondo */}

  <div className="absolute h-[260px] w-[260px] rounded-full bg-[#25D366]/15 blur-3xl"></div>

  {/* Tarjeta */}

  <div className="relative w-full rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-md">

    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#25D366] shadow-[0_0_40px_rgba(37,211,102,.55)]">

      <span className="text-[42px]">📍</span>

    </div>

    <h3 className="mt-6 text-center text-2xl font-bold text-white">
      Cobertura
    </h3>

    <p className="mt-3 text-center leading-7 text-white/80">
      Bogotá y municipios cercanos.
      Llegamos directamente hasta tu hogar.
    </p>

    <div className="mt-8 flex justify-center">

      <span className="rounded-full bg-[#25D366]/20 px-5 py-2 text-sm font-semibold text-[#9BFFD0]">
        Disponible 7 Dias a la semana
      </span>

    </div>

  </div>

  </div>

</div>

{/* BARRA INFERIOR */}

<div className="border-t border-white/10">

  <div className="flex flex-col items-center justify-between gap-6 px-10 py-7 lg:flex-row">

    {/* IZQUIERDA */}

    <div className="flex items-center gap-4">

      <div className="text-xl text-[#25D366]">
        ★★★★★
      </div>

      <p className="text-white/70">
        4.9/5 · Más de 2.500 familias atendidas
      </p>

    </div>

    {/* CENTRO */}

    <p className="text-white/50 text-center">
      © 2026 AinovaHealth. Todos los derechos reservados.
    </p>

    {/* DERECHA */}

    <div className="flex gap-8 text-white/70">

      <a href="#" className="transition hover:text-white">
        Privacidad
      </a>

      <a href="#" className="transition hover:text-white">
        Términos
      </a>

      <a href="#" className="transition hover:text-white">
        Contacto
      </a>

    </div>

  </div>

</div>

</div>

</div>

</footer>
    );
  }
  