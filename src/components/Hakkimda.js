import React from 'react'

export default function Hakkimda() {
    const yetenekListesi = [
        "İyi Bir Yazma Becerisi",
        "Araştırma Yeteneği",
        "Niche Bilgisi",
        "Editöryel Yetenek",
        "SEO Bilgisi",
        "Görsel Tasarım Yeteneği",
        "Sosyal Medya Yönetimi",
        "Okuyucu İlgisini Çekme Yeteneği",
        "İletişim Becerileri",
        "Sürekli Öğrenme İsteği"
      ];
  return (
    <div className='flex flex-col justify-center px-12 sm:px-24 md:px-32 lg:px-48 py-12 pb-16 gap-4 text-center'>

        <div className='bg-slate-200 h-64 w-64 rounded-full m-auto'>
            <img></img>
        </div>
        <div className='text-3xl font-bold tracking-wider leading-relaxed subpixel-antialiased border-b-[1.1px] w-[60%] m-auto border-slate-500 pb-2'>Merhaba ben Ali Çendek</div>
        <div className='text-md tracking-wider leading-loose	 subpixel-antialiased pt-1'>Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.</div>
        <div className='font-semibold text-xl tracking-wider leading-relaxed subpixel-antialiased pt-1 text-center'>Yetkinlikler</div>

        <div className='flex flex-row gap-1 flex-wrap justify-center'>
            {yetenekListesi.map((yetenek,index)=>(
                <p className='text-md tracking-wider leading-relaxed subpixel-antialiased w-auto ' key={index}>{yetenek} {index >= yetenekListesi.length-1 ? "" : "-"}</p>
            ))}
        </div>

    </div>
  )
}

