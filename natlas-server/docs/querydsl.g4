grammar querydsl;

querydsl: filter | querydsl WHITESPACE querydsl;

operation: TOKEN ':' port_directive;

port_directive: '[' NUMBER ',' sub_filter_chunk ']';

sub_filter_chunk: filter | sub_filter_chunk ',' sub_filter_chunk;

filter: TOKEN | TOKEN ':' filter_value;
filter_value: NUMBER | port_directive | '\'' STRING_VALUE '\'' | numeric_filter;

numeric_filter: '<' NUMBER TOKEN | '>' NUMBER TOKEN | '>' NUMBER;

TOKEN: [a-z.]+;
NUMBER: [0-9]+;
STRING_VALUE: [A-Za-z]+;
WHITESPACE: ' ';
