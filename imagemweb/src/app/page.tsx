export default function Home() {
  
  return (
    <main className="w-[60vw] m-auto border-solid">
      <h1 className="text-center bg-[#dddddd]">Criador de Memes</h1>

      <canvas className="vh-[50vh] w-full bg-[#dddddd] mt-[10px]">
      </canvas>
      <label htmlFor="superior">Informe o texto Superior</label>
      <textarea className="border-[1px] border-black w-full"
        id="superior"
        name="superior"
      />
      <label htmlFor="inferior">Informe o texto Inferior</label>
      <textarea className="border-[1px] border-black w-full"
        id="inferior"
        name="inferior"
      />
    </main>
  );
}
