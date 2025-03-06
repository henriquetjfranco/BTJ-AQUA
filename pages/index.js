import { useState } from "react";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCarretaoChange = (index, carretao, field, value) => {
    const updatedCarretao = [...formData[carretao]];
    updatedCarretao[index] = { ...updatedCarretao[index], [field]: value };
    setFormData({ ...formData, [carretao]: updatedCarretao });
  };

  const handleExport = async () => {
    const ficha = document.getElementById("ficha-preview");
    const canvas = await html2canvas(ficha);
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "ficha.png";
    link.click();
  };

  const handleShare = async () => {
    const ficha = document.getElementById("ficha-preview");
    const canvas = await html2canvas(ficha);
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
    <div className="p-6 max-w-lg mx-auto">
      {/* LOGO BTJ */}
      <img src="/logo-btj.png" alt="BTJ AQUA" className="mx-auto mb-4 w-32" />

      <h1 className="text-xl font-bold mb-4 text-center">Ficha Contagem Estoque Ração</h1>

      <input type="date" name="data" value={formData.data} onChange={handleChange} className="border p-2 w-full mb-2 text-gray-500" />
      <input type="time" name="hora" value={formData.hora} onChange={handleChange} className="border p-2 w-full mb-2 text-gray-500" />
      <input type="text" name="responsavel" placeholder="Nome do responsável" value={formData.responsavel} onChange={handleChange} className="border p-2 w-full mb-4 text-gray-500" />

      {["carretao1", "carretao2", "carretao3"].map((carretao, idx) => (
        <div key={carretao} className="mb-4">
          <h2 className="text-lg font-semibold">Carretão {idx + 1}</h2>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(carretao === "carretao2" ? 6 : 8)].map((_, i) => (
              <div key={i} className="flex items-center">
                <span className="w-6 text-sm">{i + 1}</span>
                <input
                  type="text"
                  placeholder="Digite o tipo de ração"
                  value={formData[carretao][i].racao}
                  onChange={(e) => handleCarretaoChange(i, carretao, "racao", e.target.value)}
                  className="border p-1 w-16 text-gray-500 text-sm"
                />
                <input
                  type="number"
                  placeholder="Kg disponíveis"
                  value={formData[carretao][i].kgs}
                  onChange={(e) => handleCarretaoChange(i, carretao, "kgs", e.target.value)}
                  className="border p-1 w-12 text-gray-500 text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <textarea name="observacao" placeholder="Observações" value={formData.observacao} onChange={handleChange} className="border p-2 w-full mb-4 text-gray-500" />

      <button onClick={handleExport} className="mt-4 w-full border p-2 bg-blue-500 text-white">
        Exportar como Imagem
      </button>
      <button onClick={handleShare} className="mt-2 w-full border p-2 bg-green-500 text-white">
        Compartilhar
      </button>

      {/* PEIXE E FRASE FINAL */}
      <div className="text-center mt-6">
        <img src="/peixe.png" alt="Peixe BTJ" className="mx-auto w-16" />
        <p className="text-gray-600 font-semibold">
          Fortalecer pessoas, pescando o melhor para nossos clientes
        </p>
      </div>
    </div>
  );
}
