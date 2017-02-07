package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.InstituicaoEnsino;
import projeto.entity.Projeto;

public class ProjetoDao implements InterfaceDao<Projeto> {
	
	// cria a instancia
	EntityManager em = SingletonConection.getInstance();
	
	@Override
	public void salvar(Projeto p) {
		
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados do projeto
		em.persist(p);
		// envia os dados do projeto
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
		
	}

	@Override
	public List<Projeto> listar() {
		// cria a Query para encontrar os projetos
		Query q = em.createQuery("from Projeto");
		// retorna os dados encontrados
		return q.getResultList();
	}

	@Override
	public Projeto getObjById(int id) {
		// cria a Query para encontrar o projeto de acordo com o id
		Query q = em.createQuery("from Projeto where id = " + id);
		return (Projeto) q.getSingleResult();
	}
	
	@Override
	public void alterar(Projeto t) {
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados do projeto
		em.merge(t);
		// envia os dados do projeto
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}
	
	@Override
	public void excluir(Projeto t) {
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM Projeto WHERE id=" + t.getIdProjeto()).executeUpdate();
		// envia os dados do projeto
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}
	


}
