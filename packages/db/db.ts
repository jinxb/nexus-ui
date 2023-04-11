class IndexDB {
  _db: IDBDatabase | null
  _indexedDB: IDBFactory | false
  dbName: string
  ver: number
  constructor(dbName?: string, ver?: number) {
    this._db = null
    this.dbName = dbName || 'nexus-ui'
    this.ver = ver || 1
    this._indexedDB = typeof window !== 'undefined' && window.indexedDB
  }
  open() {
    return new Promise((resolve, reject) => {
      // 判断数据库是否打开
      if (this._db) {
        resolve(this._db)
      } else {
        if (!this._indexedDB) {
          console.log('浏览器不支持IndexedDB，请检查')
          return
        }
        // 打开数据库
        const dbRequest = this._indexedDB.open(this.dbName, this.ver)

        // 首次或者版本升级时执行，根据配置信息建立表
        dbRequest.onupgradeneeded = () => {
          if (!dbRequest.result.objectStoreNames.contains('table')) {
            dbRequest.result.createObjectStore('table', { autoIncrement: true })
          }
        }
        dbRequest.onsuccess = () => {
          this._db = dbRequest.result
          resolve(dbRequest.result)
        }
        dbRequest.onerror = (err) => {
          resolve(err)
        }
      }
    })
  }
  /**
   *
   * @param key
   * @param val
   * @param name 表名
   */
  async set(key, val, name = 'table') {
    const db = (await this.open()) as IDBDatabase
    return new Promise((resolve, reject) => {
      const dbRequest = db.transaction([name], 'readwrite').objectStore(name).put(val, key)

      dbRequest.onsuccess = () => {
        resolve(dbRequest.result)
      }
      dbRequest.onerror = (err) => {
        reject(err)
      }
    })
  }

  /**
   * @param name 表名
   * @param key
   */
  async get(key, name = 'table') {
    const db = (await this.open()) as IDBDatabase
    return new Promise((resolve, reject) => {
      const request = db.transaction([name]).objectStore(name).get(key)
      request.onsuccess = () => {
        resolve(request.result)
      }
      request.onerror = (error) => {
        reject(error)
      }
    })
  }
  /**
   * @param name 表名
   * @param key
   */
  async remove(key, name = 'table') {
    const db = (await this.open()) as IDBDatabase
    return new Promise<void>((resolve, reject) => {
      const request = db.transaction([name], 'readwrite').objectStore(name).delete(key)
      request.onsuccess = function () {
        resolve()
      }
      request.onerror = (error) => {
        reject(error)
      }
    })
  }
  /**
   * @param name 表名
   */
  async clear(name = 'table') {
    const db = (await this.open()) as IDBDatabase
    return new Promise<void>((resolve, reject) => {
      const request = db.transaction([name], 'readwrite').objectStore(name).clear()
      request.onsuccess = function () {
        resolve()
      }
      request.onerror = (error) => {
        reject(error)
      }
    })
  }
}

export default new IndexDB()
