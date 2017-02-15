package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import projeto.entity.Disciplina;

public class DisciplinaDao implements InterfaceDao<Disciplina> {

	// cria a instancia
	EntityManager em = SingletonConection.getInstance();
	
	@Override
	public void salvar(Disciplina d) {
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados da disciplina
		em.persist(d);
		// envia os dados da disciplina
		em.getTransaction().commit();
		// fecha a instancia
		em.close();

	}

	@Override
	public List<Disciplina> listar() {
		// cria a Query para encontrar as disciplinas
		Query q = em.createQuery("from Disciplina");
		// retorna os dados encontrados
		return q.getResultList();
	}

	@Override
	public Disciplina getObjById(int id) {
		// cria a Query para encontrar a disciplina de acordo com o id
		Query q = em.createQuery("from Disciplina where id = " + id);
		return (Disciplina) q.getSingleResult();
	}

	@Override
	public void alterar(Disciplina d) {
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados da disciplina
		em.merge(d);
		// envia os dados da disciplina
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public void excluir(Disciplina d) {
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM Disciplina WHERE id=" + d.getIdDisciplina()).executeUpdate();
		// envia os dados da disciplina
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

}
