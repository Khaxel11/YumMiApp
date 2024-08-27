class DatabaseSingleton {
    private static instance: DatabaseSingleton;

    private constructor() {
        // config database
    }

    public static getInstance(): DatabaseSingleton {
        if (!DatabaseSingleton.instance) {
            DatabaseSingleton.instance = new DatabaseSingleton();
        }
        return DatabaseSingleton.instance;
    }
}
