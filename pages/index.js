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
    <div className="p-6 max-w-2xl mx-auto">
      {/* Logo BTJ */}
      <div className="flex justify-center mb-4">
        <img src="/BTJ.png" alt="BTJ Aqua" className="h-16 w-auto" />
      </div>

      <h1 className="text-xl font-bold text-center mb-4">Ficha Contagem Estoque Ração</h1>

      <div className="grid grid-cols-3 gap-2">
        <input type="date" name="data" value={formData.data} onChange={handleChange} 
          className="border p-2 w-full text-center" placeholder="Data"/>
        <input type="time" name="hora" value={formData.hora} onChange={handleChange} 
          className="border p-2 w-full text-center" placeholder="Hora"/>
        <input type="text" name="responsavel" placeholder="Nome do responsável" 
          value={formData.responsavel} onChange={handleChange} className="border p-2 w-full text-center"/>
      </div>

      {["carretao1", "carretao2", "carretao3"].map((carretao, idx) => (
        <div key={carretao} className="mb-4">
          <h2 className="text-lg font-semibold mt-4">Carretão {idx + 1}</h2>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(carretao === "carretao2" ? 6 : 8)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="w-6 text-center">{i + 1}</span>
                <input type="text" placeholder="Tipo" 
                  value={formData[carretao][i].racao} onChange={(e) => handleCarretaoChange(i, carretao, "racao", e.target.value)} 
                  className="border p-2 w-28 text-center"/>
                <input type="number" placeholder="Kg" 
                  value={formData[carretao][i].kgs} onChange={(e) => handleCarretaoChange(i, carretao, "kgs", e.target.value)} 
                  className="border p-2 w-20 text-center"/>
              </div>
            ))}
          </div>
        </div>
      ))}

      <textarea name="observacao" placeholder="Observações" 
        value={formData.observacao} onChange={handleChange} 
        className="border p-2 w-full mb-4 text-center"/>

      <div id="ficha-preview" className="p-4 border bg-gray-100">
        <p><strong>Data:</strong> {formData.data}</p>
        <p><strong>Hora:</strong> {formData.hora}</p>
        <p><strong>Responsável:</strong> {formData.responsavel}</p>
        
        {["carretao1", "carretao2",