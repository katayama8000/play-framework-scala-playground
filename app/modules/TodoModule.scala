package modules

import com.google.inject.AbstractModule
import models.{TodoRepository, InMemoryTodoRepository}

/**
 * アプリケーションの依存性注入設定を行うモジュール
 */
class TodoModule extends AbstractModule {
  override def configure(): Unit = {
    // TodoRepositoryの実装としてInMemoryTodoRepositoryをバインド
    bind(classOf[TodoRepository]).to(classOf[InMemoryTodoRepository])
  }
}
