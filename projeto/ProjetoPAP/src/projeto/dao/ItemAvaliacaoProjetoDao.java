package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.Disciplina;
import projeto.entity.ItemAvaliacaoProjeto;

public class ItemAvaliacaoProjetoDao {
	
	// cria a instancia
	EntityManager em = SingletonConection.getInstance();

	public void salvar(ItemAvaliacaoProjeto t) {
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados 
		em.persist(t);
		// envia os dados
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	public List<ItemAvaliacaoProjeto> listar() {
		// cria a Query para encontrar os itens
		Query q = em.createQuery("from ItemAvaliacaoProjeto");
		// retorna os dados encontrados
		return q.getResultList();
	}

	public ItemAvaliacaoProjeto getObjById(int id) {
		// cria a Query para encontrar de acordo com o id
		Query q = em.createQuery("from ItemAvaliacaoProjeto where id = " + id);
		return (ItemAvaliacaoProjeto) q.getSingleResult();
	}

	public void alterar(ItemAvaliacaoProjeto t) {
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados
		em.merge(t);
		// envia os dados
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	public void excluir(ItemAvaliacaoProjeto t) {
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM ItemAvaliacaoProjeto WHERE id=" + t.getId()).executeUpdate();
		// envia os dados
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}
	
	public List<ItemAvaliacaoProjeto> listarNotDeleted() {
		// cria a Query para encontrar os itens
		Query q = em.createQuery("from ItemAvaliacaoProjeto WHERE isActivated= "+true);
		// retorna os dados encontrados
		return q.getResultList();
	}
	
	

}
