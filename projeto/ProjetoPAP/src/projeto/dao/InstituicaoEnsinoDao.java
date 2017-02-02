package projeto.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import projeto.entity.InstituicaoEnsino;

public class InstituicaoEnsinoDao implements InterfaceDao<InstituicaoEnsino> {

	@Override
	public void salvar(InstituicaoEnsino instituicao) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// persiste os dados do objeto
		em.persist(instituicao);
		// envia os dados do objeto
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
	}

	@Override
	public List<InstituicaoEnsino> listar() {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as instituições
		Query q = em.createQuery("from InstituicaoEnsino");
		// retorna os dados encontrados
		return q.getResultList();
	}

	@Override
	public InstituicaoEnsino getObjById(int id) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// cria a Query para encontrar as instituicoes de acordo com o id
		Query q = em.createQuery("from InstituicaoEnsino where id = " + id);
		return (InstituicaoEnsino) q.getSingleResult();
	}

	@Override
	public void alterar(InstituicaoEnsino instituicao) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// da um merge nos dados da instituicao
		em.merge(instituicao);
		// envia os dados da instituicao
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}

	@Override
	public void excluir(InstituicaoEnsino instituicao) {
		// cria a instancia
		EntityManager em = SingletonConection.getInstance();
		// inicia a instancia
		em.getTransaction().begin();
		// cria uma query para para exclusão do objeto no banco..
		em.createQuery("DELETE FROM InstituicaoEnsino WHERE id=" + instituicao.getIdInstituicao()).executeUpdate();
		// envia os dados da Instituicao
		em.getTransaction().commit();
		// fecha a instancia
		em.close();
		
	}

}
