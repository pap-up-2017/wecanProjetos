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
public class Exercicio {
	
	// tag para indicar o id da classe
	@Id
	// geração de ids
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idExercicio;
	
	private String tituloExercicio;
	
	private String descricaoExercicio;
	
	@OneToOne	
	private Atividade atividade;

	public int getIdExercicio() {
		return idExercicio;
	}

	public void setIdExercicio(int idExercicio) {
		this.idExercicio = idExercicio;
	}

	public String getTituloExercicio() {
		return tituloExercicio;
	}

	public void setTituloExercicio(String tituloExercicio) {
		this.tituloExercicio = tituloExercicio;
	}

	public String getDescricaoExercicio() {
		return descricaoExercicio;
	}

	public void setDescricaoExercicio(String descricaoExercicio) {
		this.descricaoExercicio = descricaoExercicio;
	}

	public Atividade getAtividade() {
		return atividade;
	}

	public void setAtividade(Atividade atividade) {
		this.atividade = atividade;
	}

}
