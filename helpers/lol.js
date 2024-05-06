'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admin', {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admin');
  }
};


'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pengguna', {
      id_pengguna: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nomor_telp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nomor_polisi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      detail_kendaraan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tokenResetPassword: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pengguna');
  }
};


'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('parkiran', {
      blok_parkir: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      lantai: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kendaraan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('available', 'unavailable'),
        allowNull: false,
        defaultValue: 'available',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('parkiran');
  }
};


'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transaksi_parkir', {
      id_transaksi: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_pengguna: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pengguna', 
          key: 'id_pengguna',
        },
      },
      waktu_parkir: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blok_parkir: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'parkiran',
          key: 'blok_parkir',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transaksi_parkir');
  }
};


'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('parkiranrealtime', {
      id_parkir: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_pengguna: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pengguna', 
          key: 'id_pengguna',
        },
      },
      blok_parkir: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'parkiran', 
          key: 'blok_parkir',
        },
      },
      id_transaksi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'transaksi', 
          key: 'id_transaksi',
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('parkiranrealtime');
  }
};



