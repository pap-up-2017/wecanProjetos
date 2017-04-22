package projeto.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.xml.bind.annotation.XmlRootElement;

//rest
@XmlRootElement
//tag para o hibernate
@Entity
public class RespostaAtividade {
	
	// tag para indicar o id da classe
	@Id
	// geração de ids
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idRespostaAtividade;
	private String textoRespostaAtividade;
	private String statusRespostaAtividade;
	
	@OneToOne	
	private Exercicio exercicio;

	public int getIdRespostaAtividade() {
		return idRespostaAtividade;
	}

	public void setIdRespostaAtividade(int idRespostaAtividade) {
		this.idRespostaAtividade = idRespostaAtividade;
	}

	public String getTextoRespostaAtividade() {
		return textoRespostaAtividade;
	}

	public void setTextoRespostaAtividade(String textoRespostaAtividade) {
		this.textoRespostaAtividade = textoRespostaAtividade;
	}

	public String getStatusRespostaAtividade() {
		return statusRespostaAtividade;
	}

	public void setStatusRespostaAtividade(String statusRespostaAtividade) {
		this.statusRespostaAtividade = statusRespostaAtividade;
	}

	public Exercicio getExercicio() {
		return exercicio;
	}

	public void setExercicio(Exercicio exercicio) {
		this.exercicio = exercicio;
	}
	
}
