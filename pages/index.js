import { useState, useRef } from "react";
import html2canvas from "html2canvas";

export default function FichaApp() {
  const [formData, setFormData] = useState({
    data: "",
    hora: "",
    responsavel: "",
    carretao1: Array(8).fill({ racao: "", kgs: "" }),
    carretao2: Array(6).fill({ racao: "", kgs: "" }),
    carretao3: Array(8).fill({ racao: "", kgs: "" }),
    observacao: "",
  });

  const fichaRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCarretaoChange = (index, carretao, field, value) => {
    const updatedCarretao = [...formData[carretao]];
    updatedCarretao[index] = { ...updatedCarretao[index], [field]: value };
    setFormData({ ...formData, [carretao]: updatedCarretao });
  };

  const handleExport = async () => {
    if (!fichaRef.current) return;
    const canvas = await html2canvas(fichaRef.current, { scale: 2 });
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "ficha.png";
    link.click();
  };

  const handleShare = async () => {
    if (!fichaRef.current) return;
    const canvas = await html2canvas(fichaRef.current, { scale: 2 });
    const image = canvas.toDataURL("image/png");

    if (navigator.share) {
      try {
        const response = await fetch(image);
        const blob = await response.blob();
        const file = new File([blob], "ficha.png", { type: "image/png" });

        await navigator.share({
          files: [file],
          title: "Ficha Contagem Estoque Ração",
          text: "Confira a ficha preenchida.",
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    } else {
      alert("Compartilhamento não suportado neste dispositivo");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* LOGO BTJ (Corrigido) */}
      <div className="flex justify-center mb-4">
        <img src="https://i.imgur.com/NUypBOJ.png" alt="BTJ AQUA" className="w-32" />
      </div>

      <h1 className="text-xl font-bold mb-4 text-center">Ficha Contagem Estoque Ração</h1>

      <div ref={fichaRef} className="bg-white p-4 rounded-lg shadow-md">
        <input type="date" name="data" value={formData.data} onChange={handleChange} className="border p-2 w-full mb-2 text-gray-500" placeholder="Selecione a data" />
        <input type="time" name="hora" value={formData.hora} onChange={handleChange} className="border p-2 w-full mb-2 text-gray-500" placeholder="Digite a hora" />
        <input type="text" name="responsavel" placeholder="Nome do responsável" value={formData.responsavel} onChange={handleChange} className="border p-2 w-full mb-4 text-gray-500" />

        {["carretao1", "carretao2", "carretao3"].map((carretao, idx) => (
          <div key={carretao} className="mb-4">
            <h2 className="text-lg font-semibold">Carretão {idx + 1}</h2>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(carretao === "carretao2" ? 6 : 8)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <span className="w-6 text-sm">{i + 1}</span>
                  <input
                    type="text"
                    placeholder="Ração"
                    value={formData[carretao][i].racao}
                    onChange={(e) => handleCarretaoChange(i, carretao, "racao", e.target.value)}
                    className="border p-1 w-24 text-gray-500 text-sm rounded"
                  />
                  <input
                    type="number"
                    placeholder="Kg"
                    value={formData[carretao][i].kgs}
                    onChange={(e) => handleCarretaoChange(i, carretao, "kgs", e.target.value)}
                    className="border p-1 w-16 text-gray-500 text-sm rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <textarea name="observacao" placeholder="Observações" value={formData.observacao} onChange={handleChange} className="border p-2 w-full mb-4 text-gray-500 rounded" />
      </div>

      {/* BOTÕES CORRIGIDOS */}
      <button onClick={handleExport} className="mt-4 w-full border p-2 bg-blue-500 text-white rounded-lg shadow-md">
        Exportar como Imagem
      </button>
      <button onClick={handleShare} className="mt-2 w-full border p-2 bg-green-500 text-white rounded-lg shadow-md">
        Compartilhar
      </button>

      {/* PEIXE E FRASE FINAL (Corrigido) */}
      <div className="text-center mt-6">
        <img src="https://i.imgur.com/4rQgXMj.png" alt="Peixe BTJ" className="mx-auto w-16" />
        <p className="text-gray-600 font-semibold">
          Fortalecer pessoas, pescando o melhor para nossos clientes
        </p>
      </div>
    </div>
  );
}
