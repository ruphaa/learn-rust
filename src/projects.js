const book = (chapter, path) => ({ label: `The Rust Book · ${chapter}`, href: `https://doc.rust-lang.org/book/${path}.html` });
const web = { label: "Axum: routing, state, and responses", href: "https://docs.rs/axum/latest/axum/" };
const runtime = { label: "Tokio: asynchronous Rust tutorial", href: "https://tokio.rs/tokio/tutorial" };
const database = { label: "SQLx: database access", href: "https://docs.rs/sqlx/latest/sqlx/" };
const http = { label: "Reqwest: HTTP client", href: "https://docs.rs/reqwest/latest/reqwest/" };
const step = (title, task, check) => ({ title, task, check });

// Starters deliberately isolate one testable concept. The milestones build the application around it.
export const projects = [
  {
    id: "temperature", title: "Temperature converter", stage: "Beginner", time: "30–45 min", kind: "CLI", number: "01",
    summary: "Your first useful little program. Turn a number into a temperature, then teach it to handle bad input.",
    goal: "Accept a Celsius temperature as a command-line argument and print Fahrenheit with one decimal place. Invalid input should produce a helpful message.",
    lessons: ["cargo-first-program", "variables-types"], concepts: ["Variables", "Functions", "Numbers"],
    flow: ["Terminal argument", "Parse a number", "Convert", "Print a result"],
    sources: [book("3.3 · Functions", "ch03-03-how-functions-work")], origin: "Practice using Book concepts",
    code: `fn fahrenheit(celsius: f64) -> f64 {
    celsius * 9.0 / 5.0 + 32.0
}

fn main() {
    println!("20°C = {:.1}°F", fahrenheit(20.0));
}

#[test]
fn freezing_point() {
    assert_eq!(fahrenheit(0.0), 32.0);
}`,
    milestones: [
      step("Make a number change", "Run the starter. Change 20.0 to 100.0 and predict the answer before running again. Keep the conversion in its own function.", "0°C gives 32°F; 100°C gives 212°F."),
      step("Read the user's number", "Read std::env::args().nth(1). Parse the string as f64 with parse::<f64>(). Use match to distinguish a number from an invalid value.", "cargo run -- 20 prints 68.0°F."),
      step("Explain invalid input", "Handle a missing argument and a parse error separately. Send a short usage message to eprintln! and return a nonzero exit code. Reject non-finite numbers.", "Both an empty command and cargo run -- banana explain how to recover."),
      step("Test the boundaries", "Add tests for boiling, freezing, and -40 (the point where the scales agree). For non-integer results compare the absolute difference with a small tolerance.", "cargo test passes all three cases."),
    ], stretch: "Add a second argument selecting C or F and support conversion in both directions.",
  },
  {
    id: "guessing-game", title: "Guessing game", stage: "Beginner", time: "1–2 hours", kind: "Terminal game", number: "02",
    summary: "Read a guess, give a clue, and keep playing. Learn loops and errors with immediate feedback.",
    goal: "Keep asking for a number from 1 to 100. Print too small, too big, or correct. Bad input should let the player try again.",
    lessons: ["control-flow", "variables-types"], concepts: ["Loops", "match", "Input"],
    flow: ["Player input", "Parse", "Compare with secret", "Clue or finish"],
    sources: [book("2 · Guessing game", "ch02-00-guessing-game-tutorial")], origin: "Book project, with a fixed-secret starter",
    code: `use std::cmp::Ordering;

fn clue(guess: u32, secret: u32) -> &'static str {
    match guess.cmp(&secret) {
        Ordering::Less => "Too small",
        Ordering::Greater => "Too big",
        Ordering::Equal => "You got it!",
    }
}

fn main() {
    println!("{}", clue(25, 42));
}

#[test]
fn winning_guess() {
    assert_eq!(clue(42, 42), "You got it!");
}`,
    milestones: [
      step("Compare two numbers", "Run the starter with guesses below, equal to, and above 42. Read cmp's Ordering enum and follow each match arm.", "25 is too small, 50 is too big, and 42 wins."),
      step("Let a person play", "Create a new String inside a loop. Fill it with std::io::stdin().read_line, trim whitespace, and parse as u32. On a parse error, print a hint and continue.", "Typing hello or an empty line does not crash the game."),
      step("Finish and count attempts", "Reject guesses outside 1..=100. Increment an attempt counter for valid guesses. Break from the loop on a correct guess. Exit cleanly when read_line returns 0 at end of input.", "A winning guess prints the attempt count and ends the program."),
      step("Make the secret random", "Follow the Book's current rand dependency and random-range API. Generate the secret once before the loop. Keep clue as a pure function so tests do not depend on random output.", "A fresh game picks a secret in range; comparison tests remain deterministic."),
      step("Test the whole loop", "Pipe a sequence of guesses into the program using a fixed secret in a test harness. Include invalid input between valid guesses.", "Invalid guesses do not increase the valid-attempt count."),
    ], stretch: "Add difficulty levels that change the range and the allowed number of guesses.",
  },
  {
    id: "word-counter", title: "Word & text explorer", stage: "Beginner", time: "1–2 hours", kind: "CLI", number: "03",
    summary: "Count words, lines, and characters. Discover why text is more interesting than a bag of bytes.",
    goal: "Read a UTF-8 file and report line, word, character, and byte counts. Make the distinction between characters and bytes explicit.",
    lessons: ["borrowing-slices", "collections"], concepts: ["Borrowing", "Strings", "Iterators"],
    flow: ["File path", "Read UTF-8 text", "Borrow &str", "Count and print"],
    sources: [book("4.3 · Slices", "ch04-03-slices"), book("8.2 · Strings", "ch08-02-strings")], origin: "Practice using Book concepts",
    code: `fn counts(text: &str) -> (usize, usize, usize, usize) {
    (text.lines().count(), text.split_whitespace().count(),
     text.chars().count(), text.len())
}

fn main() {
    println!("lines, words, chars, bytes: {:?}", counts("Hello Rust!"));
}

#[test]
fn unicode_is_not_one_byte_per_character() {
    assert_eq!(counts("café"), (1, 1, 4, 5));
}`,
    milestones: [
      step("Borrow some text", "Call counts with a string literal and with &String. Notice that the function reads the same bytes without taking ownership.", "The caller can still print its String after counts returns."),
      step("Read a real file", "Use std::fs::read_to_string on a path from the command line. Return a Result from your application function and report file errors to stderr.", "A missing file gives an error containing its path."),
      step("Get Unicode right", "Test an accented word, empty input, and two lines. Explain that chars counts Unicode scalar values, not visual grapheme clusters.", "The café test passes and empty input returns four zeroes."),
      step("Find repeated words", "Build a HashMap from lowercase words to counts with entry(...).or_insert(0). Decide and document whether punctuation is kept.", "rust Rust counts twice under your chosen normalization rule."),
    ], stretch: "Sort the ten most common words by frequency, breaking ties alphabetically for stable output.",
  },
  {
    id: "minigrep", title: "Minigrep: your own search tool", stage: "Intermediate", time: "3–4 hours", kind: "CLI", number: "04",
    summary: "Search real files while learning arguments, borrowing, testing, and useful error messages.",
    goal: "Accept a query and file path, print matching lines, and support an IGNORE_CASE environment variable. Keep matching logic independently testable.",
    lessons: ["cli-architecture", "errors", "testing"], concepts: ["Lifetimes", "Result", "Tests"],
    flow: ["Arguments → Config", "Read file", "Search borrowed lines", "stdout / stderr"],
    sources: [book("12 · Command-line project", "ch12-00-an-io-project")], origin: "Book project",
    code: `fn search<'a>(query: &str, text: &'a str) -> Vec<&'a str> {
    text.lines().filter(|line| line.contains(query)).collect()
}

fn main() {
    for line in search("Rust", "Rust is fun\nKeep learning") {
        println!("{line}");
    }
}

#[test]
fn finds_only_matching_lines() {
    assert_eq!(search("safe", "safe code\nfast code"), vec!["safe code"]);
}`,
    milestones: [
      step("Understand the borrowed result", "The returned lines refer to text, not query. Change the query and add a no-match test before changing any file-handling code.", "An absent query returns an empty Vec, not an error."),
      step("Parse a configuration", "Create Config with query and file_path. Write Config::build over arguments, returning Result when either value is missing.", "Missing arguments give usage feedback before any file is read."),
      step("Split library from binary", "Move search, Config, and run into src/lib.rs. Keep src/main.rs responsible for printing errors and exiting with status 1.", "cargo test tests the library without invoking process::exit."),
      step("Add case-insensitive search", "Add a separate tested function that compares lowercased text while returning original lines. Use std::env::var to read IGNORE_CASE.", "Searching rust finds Rust and preserves the original spelling."),
      step("Behave like a terminal tool", "Print matches to stdout and failures to stderr. Redirect stdout to a file and inspect the result. Follow the Book's iterator refactor after tests pass.", "Redirecting matches does not capture error diagnostics."),
    ], stretch: "Add line numbers and a --count flag without duplicating the search implementation.",
  },
  {
    id: "task-cli", title: "A task list that remembers", stage: "Intermediate", time: "3–5 hours", kind: "CLI + files", number: "05",
    summary: "Model tasks, mark them done, and save them between runs. A small app with real state.",
    goal: "Implement add, list, and done commands with stable task IDs and a file-backed store that survives restarting the program.",
    lessons: ["structs-methods", "enums-patterns", "errors"], concepts: ["Structs", "Enums", "Persistence"],
    flow: ["Command", "Task model", "Store", "Readable output"],
    sources: [book("5 · Structs", "ch05-00-structs"), book("9 · Errors", "ch09-00-error-handling")], origin: "Practice using Book concepts",
    code: `#[derive(Debug)]
struct Task { id: u64, title: String, done: bool }

fn complete(tasks: &mut [Task], id: u64) -> bool {
    if let Some(task) = tasks.iter_mut().find(|task| task.id == id) {
        task.done = true;
        true
    } else { false }
}

fn main() {
    let mut tasks = vec![Task { id: 1, title: "Learn borrowing".into(), done: false }];
    complete(&mut tasks, 1);
    println!("{}: {} [{}]", tasks[0].id, tasks[0].title, tasks[0].done);
}

#[test]
fn missing_task_is_reported() { assert!(!complete(&mut [], 9)); }
`,
    milestones: [
      step("Model a task", "Use a struct for ID, title, and completion state. Keep the ID stable when tasks are removed. Reject empty titles.", "Completing the same task twice leaves it done."),
      step("Parse commands into an enum", "Create Add(String), List, and Done(u64) variants. Parse terminal input once, then match on the command in application code.", "Unknown commands and invalid IDs print usage feedback."),
      step("Save and load", "Choose a documented file format. If you start with tab-separated text, reject tabs and newlines in titles. Parse every line through Result; never silently skip damaged data.", "A task added in one process appears in a fresh process."),
      step("Protect existing data", "Write a complete replacement file to a temporary path in the same directory, flush it, and rename it over the old file. Keep errors visible and document your single-writer assumption.", "A parse failure does not replace the original file with an empty list."),
      step("Test commands with a temporary store", "Give the storage path to run instead of hardcoding it. Exercise add → list → done → reload against a test-only file.", "Tests never write to your real task list."),
    ], stretch: "Add due dates and replace the text format with versioned JSON using Serde.",
  },
  {
    id: "shortener", title: "A URL shortener API", stage: "Intermediate", time: "1–2 days", kind: "HTTP API", number: "06",
    summary: "Turn a long URL into a short code. Build your first API around a tiny, testable core.",
    goal: "POST a URL to receive a code, then GET that code to receive a redirect. Persist mappings and reject invalid destinations.",
    lessons: ["collections", "errors", "async"], concepts: ["HashMap", "HTTP", "Shared state"],
    flow: ["POST URL", "Validate + allocate code", "Store mapping", "GET → redirect"],
    sources: [book("8.3 · Hash maps", "ch08-03-hash-maps"), web, runtime], origin: "Beyond the Book · ecosystem application",
    code: `use std::collections::HashMap;

fn lookup<'a>(links: &'a HashMap<String, String>, code: &str) -> Option<&'a str> {
    links.get(code).map(String::as_str)
}

fn main() {
    let links = HashMap::from([("rust".into(), "https://www.rust-lang.org".into())]);
    println!("{}", lookup(&links, "rust").unwrap());
}

#[test]
fn unknown_code_is_absent() { assert_eq!(lookup(&HashMap::new(), "missing"), None); }
`,
    milestones: [
      step("Own the mapping", "Start with a HashMap and pure lookup function. Represent missing links as Option instead of a magic empty string.", "An unknown code is distinguishable from a stored destination."),
      step("Add HTTP routes", "Follow Axum's routing example with Tokio. Add POST /links and GET /{code}. Use a JSON extractor for creation and Redirect for a known destination.", "A valid creation returns 201; an unknown code returns 404."),
      step("Validate before writing", "Parse the destination as a URL, allow only http and https, and bound its length. Allocate codes with a uniqueness constraint and retry collisions. Short codes are identifiers, not secrets.", "A javascript: destination is rejected and duplicate codes never overwrite data."),
      step("Persist the mappings", "Use a database table with a unique code and destination. Put persistence behind a repository function so routing tests can use temporary state.", "Links created before a restart still redirect afterward."),
      step("Test the protocol", "Test status codes, Location headers, malformed JSON, missing fields, and concurrent creation. Add a request size limit before exposing the API.", "Every success response resolves to the stored URL."),
    ], stretch: "Add expiry times and per-link visit counts with atomic database updates.",
  },
  {
    id: "blog", title: "A tiny blog & publishing workflow", stage: "Intermediate", time: "2–3 days", kind: "Web app", number: "07",
    summary: "Draft, review, publish. Make invalid state transitions impossible to ignore.",
    goal: "Build a local blog with draft and published posts. Public readers see only published content; editing stays behind an authenticated author boundary.",
    lessons: ["enums-patterns", "structs-methods", "traits-lifetimes"], concepts: ["State modeling", "Templates", "CRUD"],
    flow: ["Author input", "Draft", "Review", "Published page"],
    sources: [book("18.3 · State pattern", "ch18-03-oo-design-patterns"), web, database], origin: "Beyond the Book · ecosystem application",
    code: `#[derive(Debug, PartialEq)]
enum Status { Draft, Review, Published }

fn publish(status: Status) -> Result<Status, &'static str> {
    match status {
        Status::Review => Ok(Status::Published),
        _ => Err("Send the post for review first"),
    }
}

fn main() { println!("{:?}", publish(Status::Review)); }

#[test]
fn drafts_need_review() { assert!(publish(Status::Draft).is_err()); }
`,
    milestones: [
      step("Make the state machine", "Write and test allowed transitions between draft, review, and published. Decide whether editing a published post creates a new draft.", "Publishing a draft directly returns an error."),
      step("Store posts", "Create a posts table with ID, title, slug, body, and status. Keep slug uniqueness in the database. Return Result from storage operations.", "Two posts cannot claim the same slug."),
      step("Render the public view", "Use Axum with an HTML template engine that escapes text. Fetch only published posts in public handlers; do not rely on hiding draft links.", "A guessed draft URL returns 404 and HTML in a title is displayed as text."),
      step("Add the author workflow", "Build create, edit, request-review, and publish handlers. Require an authenticated session for mutations and use CSRF protection for cookie-authenticated forms.", "An unauthenticated request cannot change a post."),
      step("Verify the whole journey", "Exercise create → review → publish → public fetch using a temporary database. Add a test that drafts never appear in the public list.", "Only the final published revision is publicly visible."),
    ], stretch: "Add revision history so the author can compare and restore earlier versions.",
  },
  {
    id: "worker-pool", title: "A bounded worker pool", stage: "Advanced", time: "4–6 hours", kind: "Concurrency", number: "08",
    summary: "Give several workers useful jobs without letting the queue grow forever.",
    goal: "Run submitted jobs on a fixed number of threads, bound waiting work, and close all workers cleanly when submissions end.",
    lessons: ["concurrency", "thread-pool"], concepts: ["Channels", "Threads", "Ownership"],
    flow: ["Job producer", "Bounded channel", "Workers", "Joined results"],
    sources: [book("16 · Concurrency", "ch16-00-concurrency"), book("21.2 · Thread pool", "ch21-02-multithreaded")], origin: "Practice using Book concepts",
    code: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (sender, receiver) = mpsc::sync_channel(2);
    let worker = thread::spawn(move || {
        for n in receiver { println!("result: {}", n * n); }
    });
    for n in 1..=4 { sender.send(n).unwrap(); }
    drop(sender);
    worker.join().unwrap();
}
`,
    milestones: [
      step("Move work to one thread", "Run the starter. The receiver loop ends when all senders are dropped. Change the channel capacity to one and watch the producer apply backpressure.", "All four jobs complete and the process exits."),
      step("Introduce a Job type", "Represent a job as Box<dyn FnOnce() + Send + 'static>. Explain why the closure must be movable across threads and owned by its worker.", "A job can capture and consume an owned String."),
      step("Share the receiver carefully", "Follow the Book's Arc<Mutex<Receiver<Job>>> design for multiple workers. Hold the lock only long enough to receive a job, then release it before executing the job.", "Two slow jobs can run simultaneously on two workers."),
      step("Close and join", "Store the sender in Option so Drop can take and drop it before joining threads. Define what your pool does after a job panics.", "Idle workers terminate at shutdown instead of hanging on recv."),
      step("Measure the concurrency limit", "Use an atomic counter in test jobs to track active workers. Submit more jobs than capacity and assert peak activity never exceeds the configured worker count.", "A two-worker pool never reports three active jobs."),
    ], stretch: "Add try_execute that reports a full queue immediately, with tests for backpressure.",
  },
  {
    id: "tinykv", title: "TinyKV: a persistent key-value store", stage: "Advanced", time: "2–3 days", kind: "Storage engine", number: "09",
    summary: "Start with a map. Add a log, replay it after a restart, and learn where durability gets tricky.",
    goal: "Support set, get, and delete. Append changes to a log and reconstruct the latest state when the process starts.",
    lessons: ["collections", "errors", "testing"], concepts: ["File I/O", "Recovery", "Data formats"],
    flow: ["Command", "Append operation", "Update index", "Replay on restart"],
    sources: [book("8.3 · Hash maps", "ch08-03-hash-maps"), book("12.2 · File I/O", "ch12-02-reading-a-file")], origin: "Practice using Book concepts",
    code: `use std::collections::HashMap;

enum Op { Set(String, String), Delete(String) }

fn apply(store: &mut HashMap<String, String>, op: Op) {
    match op {
        Op::Set(key, value) => { store.insert(key, value); }
        Op::Delete(key) => { store.remove(&key); }
    }
}

fn main() {
    let mut store = HashMap::new();
    apply(&mut store, Op::Set("language".into(), "Rust".into()));
    println!("{store:?}");
    apply(&mut store, Op::Delete("language".into()));
}
`,
    milestones: [
      step("Define the command model", "Use an enum for Set and Delete and a HashMap for current state. Test overwrites, deleting missing keys, and empty values before adding disk writes.", "Setting the same key twice returns the newer value."),
      step("Design a log format", "Give every record a length and operation tag, or use one JSON record per line. Explicitly handle delimiters inside keys and values. Keep this first version single-writer.", "A value containing a newline can round-trip without splitting into two operations."),
      step("Replay on startup", "Read records in order and call the same apply function used by live writes. Report corrupt records with a byte offset. Define whether an incomplete trailing record is recoverable.", "Restarting reconstructs overwritten values and deleted keys correctly."),
      step("Define acknowledgement", "Append before changing the in-memory map. Decide whether success means buffered, flushed, or sync_all completed, and document that durability contract.", "An append error does not leave the in-memory state ahead of the log."),
      step("Compact and recover", "Write a fresh log from current entries to a temporary file, synchronize it, then replace the old file. Test restart at each boundary; document platform-specific durability limits.", "Compaction preserves observable key-value state."),
    ], stretch: "Add checksums and fault-injection tests for truncated and corrupted writes.",
  },
  {
    id: "crawler", title: "A polite concurrent crawler", stage: "Advanced", time: "2–3 days", kind: "Async networking", number: "10",
    summary: "Fetch several pages at once while controlling duplicates, timeouts, and concurrency.",
    goal: "Crawl a local test website from one seed, stay within an allowed origin, and report unique pages without unbounded tasks or downloads.",
    lessons: ["async", "collections", "errors"], concepts: ["Futures", "Deduplication", "Limits"],
    flow: ["Seed URL", "Deduplicated frontier", "Limited fetchers", "Discovered links"],
    sources: [book("17 · Async", "ch17-00-async-await"), runtime, http], origin: "Beyond the Book · ecosystem application",
    code: `use std::collections::{HashSet, VecDeque};

fn enqueue(seen: &mut HashSet<String>, queue: &mut VecDeque<String>, url: &str) {
    if seen.insert(url.to_owned()) { queue.push_back(url.to_owned()); }
}

fn main() {
    let mut seen = HashSet::new();
    let mut queue = VecDeque::new();
    enqueue(&mut seen, &mut queue, "/start");
    enqueue(&mut seen, &mut queue, "/start");
    println!("{} queued page", queue.len());
}

#[test]
fn one_url_is_only_queued_once() {
    let (mut seen, mut queue) = (HashSet::new(), VecDeque::new());
    enqueue(&mut seen, &mut queue, "/a");
    enqueue(&mut seen, &mut queue, "/a");
    assert_eq!(queue.len(), 1);
}
`,
    milestones: [
      step("Deduplicate before fetching", "Run the frontier starter. Mark a URL seen when you enqueue it, not after the fetch, so simultaneous discoveries cannot duplicate work.", "A cycle A → B → A produces two unique pages."),
      step("Fetch one local page", "Build one reusable Reqwest client with connect and total request timeouts. Fetch only from a local fixture server while developing.", "A slow fixture fails within the configured timeout."),
      step("Bound every source of growth", "Use a semaphore for active fetches and cap total pages, response bytes, depth, and queue size. Validate redirect destinations as well as initial URLs.", "A large or endlessly linking fixture stops at the configured limits."),
      step("Resolve and filter links", "Use a URL parser to resolve relative links, discard fragments, and enforce the allowed origin. Reuse one frontier owner so workers send discoveries rather than race to update shared state.", "External-origin links and duplicate fragments are never fetched."),
      step("Shut down without losing results", "On cancellation, stop adding work, await or cancel active tasks, and summarize successes and failures. Before public crawling, implement robots policy, identification, and per-origin pacing.", "Cancellation leaves a finite report and no detached fetch tasks."),
    ], stretch: "Checkpoint the frontier and resume an interrupted local crawl.",
  },
  {
    id: "chat", title: "A real-time chat room", stage: "Advanced", time: "2–4 days", kind: "WebSockets", number: "11",
    summary: "Keep connections alive and deliver messages without letting one slow reader stall the room.",
    goal: "Build a local multi-client room with validated messages, bounded delivery queues, and reliable disconnect cleanup.",
    lessons: ["async", "concurrency", "structs-methods"], concepts: ["Channels", "WebSockets", "Cancellation"],
    flow: ["Connected clients", "Room task", "Broadcast", "Per-client writer"],
    sources: [book("17 · Async", "ch17-00-async-await"), runtime, web], origin: "Beyond the Book · ecosystem application",
    code: `fn validate_message(text: &str) -> Result<&str, &'static str> {
    let trimmed = text.trim();
    if trimmed.is_empty() { return Err("Message is empty"); }
    if trimmed.len() > 1024 { return Err("Message exceeds 1024 bytes"); }
    Ok(trimmed)
}

fn main() { println!("{:?}", validate_message(" Hello, room! ")); }

#[test]
fn whitespace_is_not_a_message() { assert!(validate_message("   ").is_err()); }
`,
    milestones: [
      step("Make messages valid", "Start with length and empty-message checks. Define an enum for Join, Message, and Leave events so room behavior can be tested without sockets.", "Invalid messages never enter the room event stream."),
      step("Own state in a room task", "Send events over a bounded Tokio channel to one room owner. Let each client keep its own outgoing queue. Avoid holding locks across await points.", "Two clients receive accepted messages in the room's chosen order."),
      step("Connect WebSocket clients", "Use Axum's WebSocket support with the ws feature. Split each connection into a reader and writer task; route validated inbound events to the room.", "Two browser tabs can exchange messages through the local server."),
      step("Handle slow and disconnected readers", "Choose a queue-full policy, such as disconnecting the slow client. When either half closes, cancel the other and remove the member exactly once.", "One stalled tab does not stop other clients receiving messages."),
      step("Add boundaries and tests", "Test oversized frames, invalid events, abrupt disconnects, and server shutdown. Check WebSocket origins and authentication before using the app beyond a local experiment.", "The member count returns to zero after every client disconnects."),
    ], stretch: "Add multiple rooms with authorization checked when joining each room.",
  },
  {
    id: "web-server-project", title: "A multithreaded web server", stage: "Production", time: "1–2 days", kind: "Book capstone", number: "12",
    summary: "Build HTTP from the socket up, then see why a worker pool changes the way requests behave.",
    goal: "Serve a greeting and a 404 response, move handling to a worker pool, then stop accepting work and join workers cleanly. This is an educational server, as the Book explicitly notes, not a hardened internet server.",
    lessons: ["web-server", "thread-pool", "concurrency"], concepts: ["TCP", "HTTP", "Shutdown"],
    flow: ["TCP listener", "Request parsing", "Worker pool", "HTTP response"],
    sources: [book("21 · Web server", "ch21-00-final-project-a-web-server")], origin: "Book project · production concepts",
    code: `fn response(body: &str) -> String {
    format!("HTTP/1.1 200 OK\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{}", body.len(), body)
}

fn main() { println!("{}", response("Hello from Rust!")); }

#[test]
fn length_is_bytes() {
    assert!(response("café").contains("Content-Length: 5"));
}
`,
    milestones: [
      step("Make a valid response", "Inspect status line, CRLF separators, headers, and body in the starter. Content-Length counts bytes, including for non-ASCII text.", "The response has one blank line before the body and the correct byte length."),
      step("Listen locally", "Follow the Book's TcpListener setup on 127.0.0.1. Read a bounded request line and use write_all for the response. Add read/write timeouts while experimenting.", "A browser or curl can fetch the greeting."),
      step("Route two cases", "Recognize GET / and return a greeting. Send a correctly framed 404 for unsupported paths; avoid reading arbitrary filesystem paths from the request.", "GET /missing returns a 404 status, not a misleading 200."),
      step("Demonstrate head-of-line blocking", "Add a deliberate slow test route, observe sequential blocking, then hand connections to the worker pool from the previous project.", "A fast request can finish while a slow request occupies another worker."),
      step("Shut down deliberately", "Stop acceptance after a fixed count for the exercise. Close the job sender, drain queued work according to your policy, and join workers as shown in the Book.", "No thread remains waiting for a sender that will never send again."),
    ], stretch: "Compare this design with Axum's server and write down what the framework handles for you.",
  },
  {
    id: "shelf-api", title: "Shelf: a database-backed API", stage: "Production", time: "3–5 days", kind: "Service", number: "13",
    summary: "Take a reading-list service through validation, persistence, integration tests, and deployment checks.",
    goal: "Implement a reading-list API with database migrations, per-user ownership, predictable error responses, pagination, and documented startup/shutdown behavior.",
    lessons: ["errors", "testing", "async", "shipping"], concepts: ["SQL", "Validation", "Operations"],
    flow: ["Authenticated request", "Validated command", "SQL transaction", "Typed response"],
    sources: [book("9 · Errors", "ch09-00-error-handling"), web, database, runtime], origin: "Beyond the Book · ecosystem application",
    code: `fn title(raw: &str) -> Result<String, &'static str> {
    let value = raw.trim();
    match value.chars().count() {
        0 => Err("Title is required"),
        1..=200 => Ok(value.to_owned()),
        _ => Err("Title must be at most 200 characters"),
    }
}

fn main() { println!("{:?}", title(" The Rust Book ")); }

#[test]
fn trims_before_validating() { assert_eq!(title(" Rust ").unwrap(), "Rust"); }
`,
    milestones: [
      step("Specify the contract", "Write examples for POST /books, GET /books, PATCH /books/{id}, and DELETE /books/{id}. Define required fields, status codes, and a bounded page size before handlers.", "Empty titles return a field-specific validation error."),
      step("Create the schema", "Use SQLx migrations for users and books with owner_id. Use bound parameters for values and constraints for invariants. Run integration tests against a separate database.", "Fresh migrations build a working database from nothing."),
      step("Enforce ownership in queries", "Resolve the authenticated user, then scope reads and writes by both resource ID and owner ID. Do not trust a user ID supplied in the JSON body.", "A second user cannot read, update, or delete the first user's book."),
      step("Make failures observable", "Return stable public error codes while keeping internal details in structured logs. Bound request bodies, timeouts, and database pool size. Include request IDs without logging credentials.", "A failed database request produces a useful internal log and a safe client response."),
      step("Prepare a release", "Load configuration once, validate it before serving, add readiness/liveness checks, and drain requests on shutdown. Run fmt, check, tests, and a release build in CI.", "A missing database configuration fails startup; deployment instructions work from a clean checkout."),
    ], stretch: "Add an idempotent import endpoint and test concurrent repeated submissions.",
  },
  {
    id: "job-queue", title: "A durable background job queue", stage: "Production", time: "3–5 days", kind: "Workers + storage", number: "14",
    summary: "Retry failed work, recover after crashes, and make repeated delivery safe.",
    goal: "Persist jobs, claim them with expiring leases, retry transient failures, and recover work after a worker crashes. Design for at-least-once delivery.",
    lessons: ["enums-patterns", "concurrency", "errors", "testing"], concepts: ["Retries", "Idempotency", "Leases"],
    flow: ["Submit job", "Persistent queue", "Lease to worker", "Complete or retry"],
    sources: [book("16 · Concurrency", "ch16-00-concurrency"), runtime, database], origin: "Beyond the Book · ecosystem application",
    code: `fn retry_delay_seconds(attempt: u32) -> u64 {
    2_u64.saturating_pow(attempt).min(60)
}

fn main() {
    for attempt in 0..8 { println!("retry {attempt}: {}s", retry_delay_seconds(attempt)); }
}

#[test]
fn backoff_is_bounded() { assert_eq!(retry_delay_seconds(100), 60); }
`,
    milestones: [
      step("Name every state", "Model pending, leased, completed, and failed states. Record attempts, available_at, lease expiry, and a stable job ID. Use an injectable clock in tests.", "A not-yet-available job cannot be claimed."),
      step("Claim atomically", "Store jobs in SQL and claim eligible work in a transaction. Attach a unique lease token so a stale worker cannot overwrite a newer worker's result.", "Two competing workers do not hold the same active lease."),
      step("Bound retries", "Classify permanent versus transient errors. Add jitter to the starter's bounded backoff, a maximum attempt count, and a failed-job view.", "A permanently invalid job does not retry indefinitely."),
      step("Survive repeated delivery", "Choose an idempotency key for each side effect, enforce it in durable storage, and recover expired leases. Do not claim exactly-once execution.", "Crashing after the side effect but before acknowledgement does not duplicate the effect on replay."),
      step("Operate and drain", "Report queue depth, age of oldest job, and failures. On shutdown stop claiming, finish or relinquish leases, and document how to retry failed jobs.", "A killed worker's leased job becomes available again after expiry."),
    ], stretch: "Add lease renewal for long jobs and test a delayed worker with an expired lease token.",
  },
  {
    id: "gateway", title: "An API gateway with failure budgets", stage: "Production", time: "3–5 days", kind: "Distributed systems", number: "15",
    summary: "Combine several services into one response without letting a slow dependency take everything down.",
    goal: "Aggregate a profile and activity service with per-dependency deadlines, bounded parallelism, and an explicit policy for optional data.",
    lessons: ["async", "errors", "traits-lifetimes", "shipping"], concepts: ["Deadlines", "Partial failure", "HTTP"],
    flow: ["Client request", "Bounded fan-out", "Required + optional results", "Combined response"],
    sources: [book("17 · Async", "ch17-00-async-await"), runtime, http, web], origin: "Beyond the Book · ecosystem application",
    code: `fn dashboard(profile: Result<&str, &str>, activity: Result<&str, &str>) -> Result<String, String> {
    let name = profile.map_err(str::to_owned)?;
    let recent = activity.unwrap_or("Activity is temporarily unavailable");
    Ok(format!("{name}: {recent}"))
}

fn main() { println!("{:?}", dashboard(Ok("Ferris"), Err("timeout"))); }

#[test]
fn profile_is_required() { assert!(dashboard(Err("missing profile"), Ok("ready")).is_err()); }
`,
    milestones: [
      step("Define partial success", "Use the starter to decide which upstream results are required and which may degrade. Make missing optional data explicit in the response schema.", "An activity timeout can degrade; a missing profile fails the request."),
      step("Build controllable fixtures", "Run local mock profile and activity endpoints. Make each independently return success, delay, malformed data, or failure.", "Every failure case can be reproduced without relying on an external service."),
      step("Add deadlines and limits", "Reuse a Reqwest client. Set per-upstream deadlines inside an overall request budget, bound concurrent requests, and cancel unneeded work.", "A stalled upstream cannot keep a client request open beyond its budget."),
      step("Make retries deliberate", "Retry only safe/idempotent operations with a small capped budget. Forward authentication only to intended services and keep upstream URLs in trusted configuration.", "One client request cannot cause an unbounded retry storm."),
      step("Measure the failure behavior", "Test latency under slow fixtures, label metrics by bounded route/outcome values, and correlate logs with a request ID. Verify shutdown cancels active fan-out.", "The gateway stays responsive when optional activity calls repeatedly time out."),
    ], stretch: "Add a short-lived cache with a clearly documented stale-data policy.",
  },
];

export const projectById = Object.fromEntries(projects.map((project) => [project.id, project]));
export function suggestedProject(lessonId) {
  return projects.find((project) => project.lessons.includes(lessonId)) || projects[0];
}
