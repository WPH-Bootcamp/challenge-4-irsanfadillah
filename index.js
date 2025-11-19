/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 * 
 * TODO: Implementasikan CLI interface yang interaktif dengan menu:
 * 1. Tambah Siswa Baru
 * 2. Lihat Semua Siswa
 * 3. Cari Siswa (by ID)
 * 4. Update Data Siswa
 * 5. Hapus Siswa
 * 6. Tambah Nilai Siswa
 * 7. Lihat Top 3 Siswa
 * 8. Keluar
 */

import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 * TODO: Implementasikan function ini
 * - Minta input: ID, Nama, Kelas
 * - Buat object Student baru
 * - Tambahkan ke manager
 * - Tampilkan pesan sukses/gagal
 */
function addNewStudent() {
  console.log('\n--- Tambah Siswa Baru ---');
  
  const id = readlineSync.question('Masukkan ID : ');
  const name = readlineSync.question('Masukkan Nama : ');
  const className = readlineSync.question('Masukkan Kelas : ');
  const student = new Student(id, name, className);
  const success = manager.addStudent(student);

  console.log(success ? '✔ Siswa berhasil ditambahkan!\n' : '❌ Gagal menambah siswa: ID sudah digunakan.');
}

/**
 * Handler untuk melihat semua siswa
 * TODO: Implementasikan function ini
 * - Panggil method displayAllStudents dari manager
 * - Jika tidak ada siswa, tampilkan pesan
 */
function viewAllStudents() {
  console.log('\n--- Daftar Semua Siswa ---');
  manager.displayAllStudents();
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 * TODO: Implementasikan function ini
 * - Minta input ID
 * - Cari siswa menggunakan manager
 * - Tampilkan info siswa jika ditemukan
 */
function searchStudent() {
  console.log('\n--- Cari Siswa ---');
  const id = readlineSync.question('Masukkan ID Siswa : ');
  const student = manager.findStudent(id);
  if (!student) return console.log('❌ Siswa tidak ditemukan!\n.');
  student.displayInfo();
}

/**
 * Handler untuk update data siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data saat ini
 * - Minta input data baru (nama, kelas)
 * - Update menggunakan manager
 */
function updateStudent() {
  console.log('\n--- Update Data Siswa ---');
  const id = readlineSync.question('Masukkan ID : ');
  const student = manager.findStudent(id);
  if (!student) return console.log('❌ Siswa tidak ditemukan!\n.');
  
  console.log('\nData Siswa Saat Ini:');
  student.displayInfo();

  const newName = readlineSync.question('Masukkan Nama Baru (kosongkan jika tidak ingin mengubah): ');
  const newClass = readlineSync.question('Masukkan Kelas Baru (kosongkan jika tidak ingin mengubah): ');
  
  const succes = manager.updateStudent(id, {
    name: newName || student.name,
    class: newClass || student.class
  });
  console.log(succes ? '✔ Data siswa berhasil diupdate!\n' : '❌ Gagal mengupdate data siswa.\n');
}

/**
 * Handler untuk menghapus siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Konfirmasi penghapusan
 * - Hapus menggunakan manager
 */
function deleteStudent() {
  console.log('\n--- Hapus Siswa ---');
  const id = readlineSync.question('Masukkan ID Siswa yang akan dihapus: ');

  const confirm = readlineSync.question('Apakah Anda yakin ingin menghapus? (y/n): ');
  if (confirm.toLowerCase() !== 'y') return console.log('❌ Penghapusan dibatalkan.\n');

  const success = manager.removeStudent(id);
  console.log(success ? '✔ Siswa berhasil dihapus!\n' : '❌ Siswa tidak ditemukan!\n');
}

/**
 * Handler untuk menambah nilai siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data siswa
 * - Minta input mata pelajaran dan nilai
 * - Tambahkan nilai menggunakan method addGrade
 */
function addGradeToStudent() {
  console.log('\n--- Tambah Nilai Siswa ---');
  const id = readlineSync.question('Masukkan ID : ');

  const student = manager.findStudent(id);
  if (!student) return console.log('❌ Siswa tidak ditemukan!\n.');

  student.displayInfo();

  const subject = readlineSync.question('Masukkan Nama Mata Pelajaran : ');
  const score = Number(readlineSync.question('Masukkan nilai (0-100) : '));
  
  try {
    student.addGrade(subject, score);
    console.log('✔ Nilai berhasil ditambahkan!\n');
  } catch (error) {
    console.log(`❌ Gagal menambahkan nilai: ${error.message}\n`);
  }
  
}

/**
 * Handler untuk melihat top students
 * TODO: Implementasikan function ini
 * - Panggil getTopStudents(3) dari manager
 * - Tampilkan informasi siswa
 */
function viewTopStudents() {
  console.log('\n--- Top 3 Siswa ---');
  const top = manager.getTopStudents(3);

  if (top.length === 0) 
    return console.log('Tidak ada siswa dalam sistem.\n');
  top.forEach(s => s.displayInfo());
}

/**
 * Main program loop
 * TODO: Implementasikan main loop
 * - Tampilkan menu
 * - Baca input pilihan
 * - Panggil handler yang sesuai
 * - Ulangi sampai user pilih keluar
 */
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');
  
  // TODO: Implementasikan loop utama program
  let running = true;
  
  while (running) {
    // Tampilkan menu
    // Baca pilihan user
    // Jalankan action sesuai pilihan
    // TODO: Lengkapi implementasi
    
    // Hint: gunakan switch-case untuk handle berbagai pilihan

    displayMenu();
    const choice = readlineSync.question('\nPilih menu (1-8): ');

    switch (choice) {
      case '1':
        addNewStudent();
        break;
      case '2':
        viewAllStudents();
        break;
      case '3':
        searchStudent();
        break;
      case '4':
        updateStudent();
        break;
      case '5':
        deleteStudent();
        break;
      case '6':
        addGradeToStudent();
        break;
      case '7':
        viewTopStudents();
        break;
      case '8':
        console.log('\nTerimakasih telah menggunakan aplikasi ini!');
        running = false;
        break;
      default:
        console.log('❌ Pilihan tidak valid, silakan coba lagi.\n');
    }
  }
}

// Jalankan aplikasi
main();
