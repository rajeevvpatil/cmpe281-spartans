import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
	bookService: any;
	bookList;
  router;

	static get parameters() {
		return [BookService, Router];
	}

  constructor(bookService, router) {
  	this.bookService = bookService;
    this.router = router;
  }

  ngOnInit() {
  	this.bookService.getAllBooks().subscribe(bookList => {
  		this.bookList = bookList;
  		console.log(this.bookList);
  	});
  }

  navigateToBook(book) {
    this.router.navigate(["home/book"], {
      queryParams: {
        book: JSON.stringify(book)
      }
    })
  }

}

