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
    <div className="p-4 max-w-lg mx-auto">
      {/* LOGO BTJ - Ajustado para não ficar desproporcional */}
        <div className="flex justify-center">
          <img 
            src="/BTJ.png" 
            alt="BTJ Logo" 
            style={{ width: "120px", height: "auto", maxWidth: "100%" }} 
          />
        </div>

      <h1 className="text-xl font-bold mb-4 text-center">Ficha Contagem Estoque Ração</h1>

      {/* CAMPOS DE DATA, HORA E RESPONSÁVEL */}
      <div className="flex gap-2 mb-4">
        <input type="date" name="data" value={formData.data} onChange={handleChange} className="border p-2 w-[60px]" />
        <input type="time" name="hora" value={formData.hora} onChange={handleChange} className="border p-2 w-[60px]" />
        <input type="text" name="responsavel" placeholder="Nome do responsável" value={formData.responsavel} onChange={handleChange} className="border p-2 w-[100px]" />
      </div>

      {/* CAMPOS DOS CARRETÕES */}
      {["carretao1", "carretao2", "carretao3"].map((carretao, idx) => (
        <div key={carretao} className="mb-4">
          <h2 className="text-lg font-semibold">Carretão {idx + 1}</h2>
          <table className="border w-full">
            <thead>
              <tr>
                <th className="border p-2">Cx</th>
                <th className="border p-2 w-[80px]">Ração</th>
                <th className="border p-2 w-[80px]">Kgs</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(carretao === "carretao2" ? 6 : 8)].map((_, i) => (
                <tr key={i}>
                  <td className="border p-2 text-center">{i + 1}</td>
                  <td className="border p-2">
                    <input type="text" placeholder="Tipo" value={formData[carretao][i].racao} onChange={(e) => handleCarretaoChange(i, carretao, "racao", e.target.value)} className="border p-2 w-[100px]" />
                  </td>
                  <td className="border p-2">
                    <input type="number" placeholder="Kg" value={formData[carretao][i].kgs} onChange={(e) => handleCarretaoChange(i, carretao, "kgs", e.target.value)} className="border p-2 w-[100px]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* CAMPO DE OBSERVAÇÕES */}
      <textarea name="observacao" placeholder="Observações" value={formData.observacao} onChange={handleChange} className="border p-2 w-full mb-4" />

      {/* BOTÕES */}
      <div className="flex gap-2">
        <button onClick={handleExport} className="border p-2 w-1/2">Exportar como Imagem</button>
        <button onClick={handleShare} className="border p-2 w-1/2">Compartilhar</button>
      </div>

      {/* LOGO PEIXE - Ajustado para não ficar desproporcional */}
        <div className="flex justify-center mt-4">
          <img 
            src="/Peixe.png" 
            alt="Peixe Logo" 
            style={{ width: "180px", height: "auto", maxWidth: "100%" }} 
          />
        </div>

      {/* FRASE FINAL */}
      <p className="text-center mt-4">Fortalecer pessoas, pescando o melhor para nossos clientes</p>
    </div>
  );
}
