import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { size, media, details, images, phoneNumber } = await request.json();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // your email address
      pass: process.env.EMAIL_PASSWORD, // your email password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${phoneNumber}`, // sender address
    to: `${process.env.EMAIL_RECIEVER}`, // list of receivers
    subject: `Nowe zapytanie o obraz BlackbellArt.com <${phoneNumber}>`, // Subject line
    html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #fff;background: #212121;border-radius:5px;padding:20px;">
        <h2 style="font-size: 24px; margin-bottom: 20px;">Nowa wiadomość od ${phoneNumber}</h2>
        <p style="margin-bottom: 20px;">Numer Telefonu: ${phoneNumber}</p>
        <p style="margin-bottom: 20px;">Zlecenie na obraz:</p>
        <div style="background-color:#fff; padding: 10px 20px 20px 20px; border-radius: 5px;color:black;">
          <p style="margin-bottom: 0;">Rozmiar: ${size}</p>
          <p style="margin-bottom: 0;">Medium: ${media}</p>
          <p style="margin-bottom: 0;">Ilość detali: ${details}</p>
          
             <p style="margin-bottom: 0;">Załączone obrazki:</p>
                 <img src="${images[0]}" alt="Załączony obrazek" style="width: 50%; height: auto; margin-top: 20px;margin:0 auto;">
                 <img src="${images[1]}" alt="Załączony obrazek" style="width: 50%; height: auto; margin-top: 20px;margin:0 auto;">
                 <img src="${images[2]}" alt="Załączony obrazek" style="width: 50%; height: auto; margin-top: 20px;margin:0 auto;">
            
        </div>
        <img src="https://blackbellart.com/_ipx/w_640,q_75/%2Fimages%2Fimage%2Fcommon%2FblackbellLogo.png?url=%2Fimages%2Fimage%2Fcommon%2FblackbellLogo.png&w=640&q=75" alt="Blackbell Logo" style=" width: 300px; height: auto;margin:20px auto;">

      </div>
    `,
  });

  return NextResponse.json({ message: info });
}
