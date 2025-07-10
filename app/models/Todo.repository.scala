package models

import models.Todo
import databases.todo.{TodoDatabase, TodoStats}
import scala.concurrent.Future
import javax.inject.{Inject, Singleton}
import scala.concurrent.ExecutionContext

/** Todo リポジトリの抽象化 データアクセス層のインターフェース
  */
trait TodoRepository {
  def findAll(): Future[List[Todo]]
  def findById(id: String): Future[Option[Todo]]
  def findByCompleted(completed: Boolean): Future[List[Todo]]
  def findByTitle(title: String): Future[List[Todo]]
  def create(todo: Todo): Future[Todo]
  def update(id: String, todo: Todo): Future[Option[Todo]]
  def toggleCompleted(id: String): Future[Option[Todo]]
  def delete(id: String): Future[Boolean]
  def deleteCompleted(): Future[Int]
  def deleteAll(): Future[Int]
  def getStats: Future[TodoStats]
}

/** インメモリのTodo リポジトリ実装 TodoDatabaseを使用してデータアクセスを行う
  */
@Singleton
class InMemoryTodoRepository @Inject() (implicit ec: ExecutionContext)
    extends TodoRepository {

  override def findAll(): Future[List[Todo]] = TodoDatabase.findAll()

  override def findById(id: String): Future[Option[Todo]] =
    TodoDatabase.findById(id)

  override def findByCompleted(completed: Boolean): Future[List[Todo]] =
    TodoDatabase.findByCompleted(completed)

  override def findByTitle(title: String): Future[List[Todo]] =
    TodoDatabase.findByTitle(title)

  override def create(todo: Todo): Future[Todo] = TodoDatabase.create(todo)

  override def update(id: String, todo: Todo): Future[Option[Todo]] =
    TodoDatabase.update(id, todo)

  override def toggleCompleted(id: String): Future[Option[Todo]] =
    TodoDatabase.toggleCompleted(id)

  override def delete(id: String): Future[Boolean] = TodoDatabase.delete(id)

  override def deleteCompleted(): Future[Int] = TodoDatabase.deleteCompleted()

  override def deleteAll(): Future[Int] = TodoDatabase.deleteAll()

  override def getStats: Future[TodoStats] = TodoDatabase.getStats
}
